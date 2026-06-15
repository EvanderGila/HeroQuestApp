export const routes = [
    {
        path: '/shop',
        name: 'shop',
        meta: { layout: 'Default' },
        component: () => import('@/views/ShopView.vue') 
    }
]