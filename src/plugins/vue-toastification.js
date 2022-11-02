// Taken from (an examples included): https://github.com/Maronato/vue-toastification/issues/134
import {
  createToastInterface,
  EventBus,
  toastInjectionKey,
  POSITION,
} from 'vue-toastification'
import 'vue-toastification/dist/index.css'

// This will be the global event bus
const globalEventBus = new EventBus()

// Prevents duplicated toast messages
const filterBeforeCreate = (toast, toasts) => {
  // if forceShow is true, toast will be shown even it's content is same as existing one(s)
  if (toast.forceShow) {
    return toast
  }
  let isSameToastVisible = false
  toasts.forEach((t) => {
    if (
      toast.content === t.content ||
      (toast.content.component &&
        toast.content.component?.name === t.content.component?.name)
    ) {
      isSameToastVisible = true
    }
  })

  return isSameToastVisible ? false : toast
}

const toastOptions = {
  position: POSITION.TOP_RIGHT,
  maxToasts: 4,
  newestOnTop: false,
  filterBeforeCreate,
}

// Call this function once to create and mount a global toast container
export function createGlobalToast(options) {
  return createToastInterface({ ...options, eventBus: globalEventBus })
}

// Returns an interface to the global toast container
export function useGlobalToast() {
  return createToastInterface(globalEventBus)
}

// Use this as a plugin to register instance and injected toasts
export function provideAppToast(app, options) {
  // Create the global container
  const toast = createGlobalToast({ ...toastOptions, ...options })

  // Provide using Vue dependency injection
  app.provide(toastInjectionKey, toast)

  // Bind to the global object so it can be called with this.$toast
  app.config.globalProperties.$toast = toast
}

// usage examples
// for js files:
// import { useGlobalToast } from '@/plugins/vue-toastification'
// const toast = useGlobalToast()
// toast.success('naber')

// for vue script section options API
// this.$toast.success('naber')

// for composition api
// import { useGlobalToast } from '@/plugins/vue-toastification'
// const toast = useGlobalToast()
// export default {
//   setup() {
//     toast.success('naber')
//     ...
//   }
//   ...
// }

// more: https://github.com/Maronato/vue-toastification/issues/134
