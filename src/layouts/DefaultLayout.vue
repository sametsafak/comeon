<template>
  <AppSidebar />
  <div
    class="wrapper d-flex flex-column min-vh-100 bg-light dark:bg-transparent"
  >
    <AppHeader />
    <div class="body flex-grow-1 px-lg-3">
      <CContainer lg>
        <!-- <router-view /> -->
        <!-- <router-view v-slot="{ Component, route }">
          <transition name="fade">
            <component :is="Component" :key="route.path" />
          </transition>
        </router-view> -->

        <router-view v-slot="{ Component, route }">
          <transition name="route" mode="out-in">
            <component :is="Component" :key="route.path"></component>
          </transition>
        </router-view>
      </CContainer>
    </div>
    <AppFooter />
  </div>
</template>
<script>
import { CContainer } from '@coreui/vue-pro'
import AppFooter from '@/components/AppFooter.vue'
import AppHeader from '@/components/AppHeader.vue'
import AppSidebar from '@/components/AppSidebar.vue'

export default {
  name: 'DefaultLayout',
  components: {
    AppFooter,
    AppHeader,
    AppSidebar,
    CContainer,
  },
}
</script>
<style lang="scss">
/* route transitions */
.route-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}
.route-enter-active {
  transition: all 0.25s ease-out;
}
.route-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
.route-leave-active {
  transition: all 0.1s ease-in;
}
</style>
