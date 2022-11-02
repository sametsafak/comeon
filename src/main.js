import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'

// core ui
import CoreuiVue from '@coreui/vue-pro'
import CIcon from '@coreui/icons-vue'
import { iconsSet as icons } from '@/assets/icons'

// helpers / services (provide>inject)
import errorHandler from '@/helpers/error-handler'

// plugins
import { provideAppToast } from '@/plugins/vue-toastification'

// directives
import FloatingVue from 'floating-vue'
import 'floating-vue/dist/style.css'

// components
import Dev from '@/components/Dev.vue'

const app = createApp(App)
app.use(provideAppToast)
app.use(store)
app.use(router)
app.use(CoreuiVue)
app.use(FloatingVue, {
  themes: {
    tooltip: {
      triggers: ['hover', 'focus', 'click'],
      delay: {
        show: 600,
      },
    },
  },
})
app.provide('icons', icons)
app.component('Dev', Dev)
app.component('CIcon', CIcon)

app.config.globalProperties.$errorHandler = errorHandler

app.mount('#app')

// export default app
