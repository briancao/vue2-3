<template>
  <div class="min-h-screen bg-background text-foreground">
    <nav class="flex items-center gap-6 border-b px-6 py-3">
      <NuxtLink to="/" class="font-semibold">Vue 3 App</NuxtLink>
      <!-- Plain <a>: crossing into the Vue 2 app is a full page load. -->
      <a href="/" class="text-sm text-muted-foreground hover:text-foreground">Old app (Vue 2)</a>
    </nav>
    <main class="mx-auto max-w-3xl p-6">
      <NuxtPage />
    </main>
  </div>
</template>
