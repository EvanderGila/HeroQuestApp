export const routes = [
  {
    path: '/compendium',
    name: 'compendium',
    meta: { layout: 'Default' },
    component: () => import('@/views/CompendiumView.vue')
  }
]
