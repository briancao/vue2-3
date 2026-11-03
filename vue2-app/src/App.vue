<template>
  <div id="app">
    <b-navbar type="dark" variant="dark">
      <b-navbar-brand to="/">Vue 2 App</b-navbar-brand>
      <b-navbar-nav>
        <b-nav-item to="/">Home</b-nav-item>
        <!-- href (not to): crossing into the Nuxt app is a full page load. -->
        <b-nav-item href="/next/">New app (Vue 3)</b-nav-item>
      </b-navbar-nav>
    </b-navbar>
    <b-container class="py-4">
      <router-view />
    </b-container>
    <portal-target name="footer" />
    <vue-snotify />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class App extends Vue {}
</script>
