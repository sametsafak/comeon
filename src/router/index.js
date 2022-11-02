import { createRouter, createWebHistory } from 'vue-router'
import { debounce } from 'lodash'

import store from '@/store'
import errorHandler from '@/helpers/error-handler'

import routes from './routes'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    // always scroll to top
    return { top: 0 }
  },
})

let redirectPath = null
let redirectParams = {}
let infiniteLoopDetected = false
let routeChangeRequestIn1000ms = 0

// if a problem happans about acl's and default routes, router will stuck in an infinite loop
// in this case, we need to redirect to the error page
const debouncer = debounce(async () => {
  routeChangeRequestIn1000ms = 0
}, 1000)

// if user tries to go an unauthorized route with an infinite loop, redirect to the error page
const checkInfiniteUnauthorizedRouteLoop = () => {
  routeChangeRequestIn1000ms++
  if (routeChangeRequestIn1000ms > 25) {
    infiniteLoopDetected = true
  }
  debouncer()
}

const navGuards = {
  requiresAuth: (to, from, memberData) => {
    // if auth required and memberData is not empty
    if (memberData) {
      // member loaded successfully, continue route
      return true
    }

    // if auth required and memberData is empty
    if (!memberData) {
      // member can't loaded. clear token, redirect to the login page
      store.dispatch('memberModule/LOGOUT_MEMBER')
      return false
    }
  },
  acl: (to, from, aclData) => {
    // if route doesn't have requiresAcl nav guard, continue
    if (!to.meta.requiresAcl) {
      return true
    }

    if (to.meta.requiresAcl.includes('NOT_LOGGED_IN_MEMBER')) {
      return true
    }

    if (to.meta.requiresAcl.some((a) => aclData.includes(a))) {
      return true
    }

    return false
  },
}

const getAclData = async function (next) {
  let aclData = null
  try {
    aclData = await store.dispatch('memberModule/GET_ACL')

    let showDevMode = localStorage.getItem('devAcl') === 'true'
    store.commit('memberModule/TOGGLE_DEV_ACL', {
      show: showDevMode,
    })

    // if dev mode enabled, update acl data
    if (showDevMode) {
      aclData = await store.dispatch('memberModule/GET_ACL')
    }
  } catch (error) {
    // acl is necessary to continue but there is an error while getting it
    next(false)
    store.dispatch('memberModule/LOGOUT_MEMBER', {
      redirectAfterLogin: true,
    })
    // to show toast notification if necessary
    errorHandler(error)
  }

  return aclData
}

router.beforeEach(async (to, from, next) => {
  redirectPath = null
  redirectParams = {}

  // get member data to using it in nav guards
  let memberData = null
  try {
    memberData = await store.dispatch('memberModule/GET_MEMBER')
  } catch (error) {
    // if auth not required, don't show any error, continue
    if (!to.meta.requiresAuth) {
      next(true)
      return
    }

    // user is necessary to continue but there is an error while getting it
    next(false)
    store.dispatch('memberModule/LOGOUT_MEMBER', {
      redirectAfterLogin: true,
    })
    // to show toast notification if necessary
    errorHandler(error)
    return
  }

  // get acl data to show aside, header etc. by acl and using it in nav guards
  let aclData = await getAclData(next)

  // if member not authorized, codes below are shouldn't execute
  // try catch block above, checks the auth state and redirects to login if necessary
  // DEV acl can go anywhere
  if (aclData.includes('DEV')) {
    next(true)
    return
  }

  if (to.path === '/pages/500') {
    next(true)
    return
  }

  // check if all navguards passing
  if (
    navGuards.requiresAuth(to, from, memberData) &&
    navGuards.acl(to, from, aclData)
  ) {
    next(true)
    return
  }

  // you shall not pass! go home
  next(false)

  // params are ignored if a path is provided. wtf? https://router.vuejs.org/guide/essentials/navigation.html#navigate-to-a-different-location
  let serializedParams = redirectParams
    ? '?' + new URLSearchParams(redirectParams).toString()
    : ''
  let handledRedirectUrl =
    redirectPath || store.state?.memberModule?.defaultRoute || '/'
  router.push(handledRedirectUrl + serializedParams)

  let redirectFullUrl = redirectPath || to.path

  // if user cannot go to it's default route, prevent endless loop
  if (store.state?.memberModule?.defaultRoute === redirectFullUrl) {
    router.push('/pages/default-route-error')
    console.error(
      "User don't have access to this it's default route. Check ACL's",
    )
  }

  // if user cannot go requested route and default route, prevent endless loop
  if (infiniteLoopDetected) {
    router.push('/pages/default-route-error')
    console.error(
      "Infinite loop detected. User don't have access to this it's default route. Check ACL's",
    )
    infiniteLoopDetected = false
  }

  console.warn(
    'routing interrupted from nav guards and redirected',
    '\n',
    'from: ',
    { path: from.path },
    { from },
    '\n',
    'to: ',
    { path: to.path },
    { to },
  )

  checkInfiniteUnauthorizedRouteLoop()
})

export default router
