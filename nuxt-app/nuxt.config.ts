import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-01',
  // Opt in to Nuxt 4 layout/defaults now (app/ dir etc.) so the Nuxt 4 upgrade is a version bump.
  future: { compatibilityVersion: 4 },
  // Static SPA: no Node server needed in production.
  ssr: false,
  app: {
    // Everything Nuxt owns lives under /next/, so it never collides with Vue 2 routes.
    baseURL: '/next/',
    head: { title: 'Vue 3 App' },
  },
  // Static output goes straight into the shared wwwroot, under the /next/ base path.
  nitro: { output: { publicDir: '../wwwroot/next' } },
  modules: ['shadcn-nuxt'],
  shadcn: { prefix: '', componentDir: './app/components/ui' },
  css: ['~/assets/css/tailwind.css'],
  vite: { plugins: [tailwindcss()] },
  // Vite already minifies CSS. cssnano on top of the full shadcn stylesheet took the build from ~2s to ~140s.
  postcss: { plugins: { cssnano: false } },
  devtools: { enabled: false },
  // Otherwise the first run asks an interactive question, which can hang the dotnet build.
  telemetry: false,
})
