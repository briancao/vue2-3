<script setup lang="ts">
import localforage from 'localforage'

// Same origin as the Vue 2 app, so we can read what vuex-persist saved there.
const vue2State = ref<{ counter?: number } | null>(null)
const name = ref('')

onMounted(async () => {
  vue2State.value = await localforage.getItem('vue2-app')
})
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-3xl font-semibold">Home (Vue 3 / Nuxt)</h1>
      <p class="text-muted-foreground">Served from /next/. New pages go in nuxt-app/app/pages.</p>
    </div>

    <Card>
      <CardHeader>
        <CardTitle>Shared storage</CardTitle>
        <CardDescription>Read from IndexedDB, written by the Vue 2 app.</CardDescription>
      </CardHeader>
      <CardContent>
        Counter: <strong>{{ vue2State?.counter ?? 'not set yet' }}</strong>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>shadcn-vue</CardTitle>
      </CardHeader>
      <CardContent class="flex gap-2">
        <Input v-model="name" placeholder="Your name" />
        <Button :disabled="!name">Say hi</Button>
        <Button variant="outline">Outline</Button>
      </CardContent>
    </Card>
  </div>
</template>
