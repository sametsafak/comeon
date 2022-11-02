export default [
  {
    path: '404',
    name: 'Page404',
    component: () => import('@/views/pages/Page404.vue'),
  },
  {
    path: '500',
    name: 'Page500',
    component: () => import('@/views/pages/Page500.vue'),
  },
  {
    path: 'default-route-error',
    name: 'Default Route Error',
    component: () => import('@/views/pages/DefaultRouteError.vue'),
  },
  {
    path: 'login',
    name: 'Login',
    component: () => import('@/views/pages/authorization/Login.vue'),
  },
]
