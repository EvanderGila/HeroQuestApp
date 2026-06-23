export const routes = [
  {
    path: '/characters',
    name: 'characters',
    meta: { layout: 'Default' },
    component: () => import('@/views/CharactersView.vue')
  },

  {
    path: '/character-create',
    name: 'charactercreate',
    meta: { layout: 'Blank' },
    component: () => import('@/views/CreateCharacterView.vue')
  }
]
