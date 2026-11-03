// Nuxt has no watch mode for static output, so rerun `nuxt generate` whenever source changes.
import { spawn } from 'node:child_process'
import { watch } from 'node:fs'

const WATCH = ['app', 'public', 'nuxt.config.ts']
let running = false
let queued = false
let timer

function generate() {
  if (running) return (queued = true)
  running = true
  const started = Date.now()
  const child = spawn('npx', ['nuxt', 'generate'], { stdio: 'inherit', shell: process.platform === 'win32' })
  child.on('exit', (code) => {
    running = false
    console.log(code === 0 ? `[watch] generated in ${Date.now() - started}ms` : `[watch] generate failed (${code})`)
    if (queued) {
      queued = false
      generate()
    }
  })
}

for (const target of WATCH) {
  try {
    watch(target, { recursive: true }, () => {
      clearTimeout(timer)
      timer = setTimeout(generate, 200)
    })
  } catch {
    // e.g. public/ doesn't exist yet
  }
}

console.log(`[watch] watching ${WATCH.join(', ')}`)
generate()
