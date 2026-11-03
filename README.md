# Vue 2 + Nuxt (Vue 3) side by side

Both apps build into one `wwwroot/` and are served from one origin, split by path:

| Path            | App                 | Source      | Output          |
|-----------------|---------------------|-------------|-----------------|
| `/next/*`       | Nuxt 3 (Vue 3, SPA) | `nuxt-app/` | `wwwroot/next/` |
| everything else | Vue 2 (Vue CLI 5)   | `vue2-app/` | `wwwroot/`      |

Same origin means localStorage, IndexedDB, cookies and the MSAL cache are shared.
Moving between the apps is a full page load, so link with a plain `<a href>`, not `router-link` or `NuxtLink`.

Tested on Node 20.15.0 / npm 10.7.0. `yarn <script>` runs the same scripts.

## Scripts (repo root)

| Script      | What it does |
|-------------|--------------|
| `dev`       | Dev builds of both apps into `wwwroot/`, served on http://localhost:4000 |
| `build:dev` | One-off development-mode build of both apps into `wwwroot/` |
| `build`     | Production build of both apps into `wwwroot/` |
| `start`     | Serves `wwwroot/` on http://localhost:4000 |

```sh
npm install && npm run install:all
npm run dev
```

## How it fits together

- Everything runs from `wwwroot/`, even in dev. The Vue 2 dev server (:8080) uses `writeToDisk`,
  so every build, including HMR hot-update chunks, is written to `wwwroot/`. The page connects back to
  `ws://localhost:8080/ws` only for change notifications.
- Nuxt (Vite) can't write HMR to disk. In dev it rebuilds `wwwroot/next/` on change and needs a manual refresh.
- The Vue 2 build runs with `--no-clean`. Vue CLI empties its output folder before building by default,
  which would delete `wwwroot/next/`. The root scripts clean `wwwroot/` once, before both builds.
- Nuxt writes to `wwwroot/next` through `nitro.output.publicDir` in `nuxt.config.ts`.
- Nuxt has no watch mode for static output. `nuxt-app/scripts/watch-generate.mjs` reruns
  `nuxt generate` on changes, which takes about 3s.
- `server.js` stands in for ASP.NET. It serves `wwwroot/next/*`, falling back to `wwwroot/next/index.html`,
  and everything else, falling back to `wwwroot/index.html`.

## Hooking into the .NET build

Point the existing yarn step at these scripts, for example in the `.csproj`:

```xml
<Target Name="BuildFrontend" BeforeTargets="Build">
  <Exec Condition="'$(Configuration)' == 'Debug'" Command="yarn build:dev" WorkingDirectory="ClientApp" />
  <Exec Condition="'$(Configuration)' != 'Debug'" Command="yarn build" WorkingDirectory="ClientApp" />
</Target>
```

ASP.NET must route `/next/*` to `wwwroot/next/index.html` before its catch-all fallback to `wwwroot/index.html`.

## Adding a page

- New pages go in `nuxt-app/app/pages/` (for example `reports.vue` becomes `/next/reports`).
- Old pages stay in `vue2-app/src/views/` with routes in `vue2-app/src/router`.

## Notes

- **Service worker:** if the Vue 2 app registers one with scope `/`, exclude `/next/` from its
  navigation fallback (Workbox `navigateFallbackDenylist: [/^\/next\//]`). Otherwise it serves the Vue 2 shell for Nuxt pages.
- **shadcn-vue:** Tailwind 4 + `shadcn-nuxt`. Add components with `npx shadcn-vue@2.7.4 add <name>`.
  Keep the CLI at 2.7.4: 2.8+ needs Node 22.
- **Nuxt 4:** `future.compatibilityVersion: 4` is already on. Upgrading is a version bump once Node is 22+.
- **Pins in `vue2-app`:** `postcss@8`, `ajv@8` and an exact `@types/lodash@4.17.0` fix problems
  that a fresh install hits. The real project's lockfile may not need them.
