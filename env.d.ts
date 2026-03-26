/// <reference types="vite/client" />
/// <reference types="vite-plugin-vue-layouts-next/client" />
/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}