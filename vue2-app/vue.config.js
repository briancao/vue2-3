const path = require('path')
const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: false,
  lintOnSave: false,
  // Shared with the Nuxt app (which writes to wwwroot/next), so builds must run with --no-clean.
  outputDir: path.resolve(__dirname, '../wwwroot'),
  devServer: {
    port: 8080,
    // The app is served from wwwroot by the host (ASP.NET / server.js), not from this dev server.
    // webpack writes every build, including hot-update chunks, to wwwroot, and the page's HMR
    // client connects back here only for change notifications.
    devMiddleware: { writeToDisk: true },
    client: { webSocketURL: 'ws://localhost:8080/ws' },
    allowedHosts: 'all',
  },
})
