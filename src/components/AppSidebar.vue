<template>
  <CSidebar
    position="fixed"
    class="bg-transition"
    :class="acl?.includes('DEV') ? 'bg-primary' : ''"
    :unfoldable="sidebarUnfoldable"
    :visible="sidebarVisible"
    @visible-change="UPDATE_SIDEBAR_VISIBLE({ value: $event })"
  >
    <CSidebarBrand>
      <router-link
        to="/"
        class="d-flex align-items-center text-decoration-none"
      >
        <img src="@/assets/brand/logo.svg" alt="comeon" class="wide-logo" />
        <img src="@/assets/brand/logo.svg" alt="comeon" class="narrow-logo" />
      </router-link>
    </CSidebarBrand>
    <AppSidebarNav :current-member-acl="acl" />
    <CSidebarToggler class="d-none d-lg-flex" @click="TOGGLE_UNFOLDABLE()" />
  </CSidebar>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { AppSidebarNav } from './AppSidebarNav'
export default {
  name: 'AppSidebar',
  components: {
    AppSidebarNav,
  },
  data() {
    return {}
  },
  computed: {
    ...mapState(['sidebarUnfoldable', 'sidebarVisible']),
    ...mapState('memberModule', ['member', 'acl']),
  },
  methods: {
    ...mapMutations(['UPDATE_SIDEBAR_VISIBLE', 'TOGGLE_UNFOLDABLE']),
  },
}
</script>

<style>
.bg-transition {
  transition: all 220ms ease;
}
</style>
