import Vue from 'vue'

declare module 'vue/types/vue' {
  interface Vue {
    $snotify: any
    $loading: any
    $log: any
  }
}
