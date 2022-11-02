// import the api endpoints
import memberApi from '@/api/member-api'
import router from '@/router'

const state = {
  member: null,
  acl: null,
  defaultRoute: '/',
}

const actions = {
  // LOGIN_MEMBER can be used only for getting and setting token, not for getting member data etc.
  // It also clears login related stuff before setting token.
  async LOGIN_MEMBER(context, payload) {
    return new Promise((resolve, reject) => {
      // to make login request without token, otherwise service returns 401 even if cridentials are correct
      context.commit('CLEAR_AUTH')

      memberApi
        .login(
          payload.formData.username,
          payload.formData.password,
          payload.recaptchaToken,
        )
        .then((res) => {
          if (res.data?.token) {
            localStorage.setItem('token', res.data?.token)
          } else {
            console.error(
              'An error happened while saving token. Please check it.',
            )
          }
          resolve(res)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  /**
   *
   * @param {Object} context - auto filled by vue
   * @param {Object} payload
   * @param {Boolean} payload.refresh - re-download member data from server
   * @returns {Promise}
   */
  async GET_MEMBER(context, payload) {
    return new Promise((resolve, reject) => {
      if (!localStorage.getItem('token')) {
        reject('TOKEN_NOT_FOUND')
        return
      }

      if (context.state.member && payload?.refresh !== true) {
        resolve(context.state.member)
        return
      }

      const localStorageMember = JSON.parse(
        localStorage.getItem('member') || null,
      )

      if (localStorageMember && payload?.refresh !== true) {
        resolve(localStorageMember)
        context.commit('SET_MEMBER', localStorageMember)
        return
      }

      // getMember()
      //   .then((res) => {
      //     context.commit('SET_MEMBER', res.data?.player)
      //     resolve(res.data?.payload)
      //   })
      //   .catch((error) => {
      //     reject(error)
      //   })
    })
  },

  /**
   *
   * @param {Object} context - auto filled by vue
   * @param {Object} payload
   * @param {Boolean} payload.refresh - re download acl data from server
   * @returns {Promise}
   */
  async GET_ACL(context, payload) {
    return new Promise((resolve, reject) => {
      if (context.state.acl && payload?.refresh !== true) {
        resolve(context.state.acl)
        return
      }

      memberApi
        .getAcl()
        .then((res) => {
          context.commit('SET_ACL', res.data?.payload)
          resolve(context.state.acl)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  async LOGOUT_MEMBER(context) {
    return new Promise((resolve, reject) => {
      memberApi
        .logout('eric')
        .then((res) => {
          resolve(res)
          context.commit('CLEAR_AUTH')
          router.push({
            path: '/pages/login',
          })
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
}

const mutations = {
  SET_MEMBER(state, payload) {
    state.member = payload
    localStorage.setItem('member', JSON.stringify(payload))
    state.defaultRoute = '/'
  },
  SET_ACL(state, payload) {
    state.acl = payload
  },
  SET_DEFAULT_ROUTE(state, payload) {
    state.defaultRoute = payload.defaultRoute
  },
  TOGGLE_DEV_ACL(state, payload) {
    if (payload.show && process.env.VUE_APP_DEV_ACL === 'true') {
      // add DEV to acl if it is not already there
      if (!state.acl.includes('DEV')) {
        state.acl = [...state.acl, 'DEV']
      }
      localStorage.setItem('devAcl', true)
    } else {
      // Remove DEV from acl
      state.acl = state.acl.filter((a) => a !== 'DEV')
      localStorage.removeItem('devAcl')
    }
  },
  CLEAR_AUTH(state) {
    state.member = null
    state.acl = null
    state.defaultRoute = '/'
    localStorage.removeItem('token')
  },
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
}
