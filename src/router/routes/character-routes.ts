export const routes = [
    {
        path: '/characters',
        name: 'characters',
        meta: { layout: 'Default' },
        component: () => import('@/views/CharactersView.vue') 
    }
]