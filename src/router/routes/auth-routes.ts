export const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/views/HomeView.vue')
    },
    {
        path: '/login',
        name: 'login',
        meta: { layout: 'Blank' },
        component: () => import('@/views/LoginView.vue') 
    }
]