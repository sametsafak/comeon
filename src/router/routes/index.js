import { h, resolveComponent } from 'vue'

import DefaultLayout from '@/layouts/DefaultLayout'
import unauthRoutes from './unauth-routes'

export default [
  {
    path: '/',
    name: 'Home',
    redirect: '/games',
    meta: { requiresAuth: true },
    component: DefaultLayout,
    children: [
      {
        path: '/games',
        name: 'Games',
        component: () => import('@/views/games/Games.vue'),
        meta: { requiresAcl: ['PAGE_GAMES'] },
      },
      {
        path: '/game',
        name: 'Game',
        component: () => import('@/views/games/Game.vue'),
        meta: { requiresAcl: ['PAGE_GAME'] },
      },
    ],
  },
  {
    path: '/pages',
    redirect: '/pages/404',
    name: 'Pages',
    component: {
      render() {
        return h(resolveComponent('router-view'))
      },
    },
    children: [...unauthRoutes],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'Page404',
    component: () => import('@/views/pages/Page404'),
  },
]
