// DEV acl can see every menu item in sidebar menu

export default [
  {
    name: 'Games',
    component: 'CNavItem',
    acl: ['NAV_GAMES'],
    to: '/games',
    icon: 'cil-globe-alt',
  },
]
