import GenericError from '@/components/GenericError.vue'
import router from '@/router'

import store from '@/store'

import { useGlobalToast } from '@/plugins/vue-toastification'
const globalToast = useGlobalToast()

/**
 *
 * @param {(object|string)} error
 * @param {boolean} [showToast=true]
 * @param {(string|'info'|'success'|'error'|'warning')} [toastType=error] - toastType
 */
const errorHandler = (error, showToast = true, toastType = 'error') => {
  const statusCode = error?.response?.status
  const responseError = error?.response?.data?.error
  const statusErrorMessage = error?.message
  const rawError = error
  let toastErrorText

  console.error(
    'Error handler log:',
    '\n',
    statusCode ? { statusCode } : '',
    statusCode ? '\n' : '',

    responseError ? { responseError } : '',
    responseError ? '\n' : '',

    statusErrorMessage ? { statusErrorMessage } : '',
    statusErrorMessage ? '\n' : '',

    rawError ? { rawError } : '',
  )

  // group error trace log to keep console cleaner
  console.groupCollapsed('Error Trace --- click here to show/hide trace ---')
  console.trace()
  console.groupEnd()

  const toastHandler = function () {
    if (showToast) {
      globalToast[toastType](toastErrorText)
    }
  }

  // if there is a network error, axios sends Network Error as text. no status code.
  // https://github.com/axios/axios/issues/383
  if (error?.message === 'Network Error') {
    toastErrorText = `We're sorry for the inconvenience, service is temporarily unavailable. Please try again shortly.`
    toastHandler()
    return
  }

  // if error type is string, don't continue to http response error handling codes
  if (typeof error === 'string') {
    toastErrorText = error

    if (error === 'TOKEN_NOT_FOUND') {
      // if path is home, don't show toast notification
      if (router.options.history.location === '/') {
        return
      }
      toastErrorText = 'Please login to continue.'
    }

    toastHandler()
    return
  }

  toastErrorText = responseError || GenericError

  switch (error?.response?.status) {
    case 0:
      toastErrorText = `We're sorry for the inconvenience, service is temporarily unavailable. Please try again shortly.`
      break
    case 401: // authentication error, logout the user
      store.dispatch('memberModule/LOGOUT_MEMBER')
      break
    case 500:
      // we don't have to redirect user to 500 page in every response has status 500
      // therefore we are handling this edge case in related request block. not in here.
      toastErrorText = GenericError
      break
  }

  toastHandler()
}

export default errorHandler
