<template>
  <CHeader position="sticky" class="mb-4 px-lg-3 px-0">
    <CContainer fluid>
      <!-- left section -->
      <div class="d-flex align-items-center">
        <!-- sidebar toggler -->
        <CHeaderToggler class="ps-0" @click="$store.commit('TOGGLE_SIDEBAR')">
          <CIcon icon="cil-menu" size="lg" />
        </CHeaderToggler>

        <!-- hidden sidebar logo -->
        <div class="d-flex align-items-center" v-if="!sidebarVisible">
          <router-link
            to="/"
            class="d-flex align-items-center text-decoration-none"
          >
            <!-- header logo -->
            <CHeaderBrand class="d-flex me-0 my-header-logo" to="/">
              <img
                :src="
                  theme === 'default'
                    ? getImgUrl('brand/logo-dark.svg')
                    : getImgUrl('brand/logo.svg')
                "
                alt="comeon logo"
                class="header-big-logo"
              />
            </CHeaderBrand>
          </router-link>
        </div>
      </div>

      <!-- right section -->
      <div
        class="header-nav flex-wrap align-items-center ms-auto justify-content-end"
      >
        <!-- dev only switch -->
        <div
          v-if="showDevAclSwitch"
          class="d-flex rounded border px-2 py-1 me-3 bg-gradient bg-opacity-75"
          :class="
            acl?.includes('DEV')
              ? 'bg-info border-primary text-white'
              : 'bg-light'
          "
        >
          <div
            class="d-flex align-items-center form-control-remove-margin-bottom"
          >
            <!-- <router-link to="/demo/vuex-test" class="me-2">vuex</router-link> -->
            <CFormSwitch
              class="flex-row-reverse bg-success"
              label="dev"
              id="dev-acl"
              :checked="acl?.includes('DEV')"
              @change="TOGGLE_DEV_ACL({ show: $event.target.checked })"
            />
          </div>
        </div>

        <!-- visible only lg and upper -->
        <div class="d-none d-lg-flex">
          <!-- theme selector -->
          <div class="me-3 d-flex align-items-center theme-selector-wrapper">
            <AppHeaderThemeSelector />
          </div>
        </div>

        <!-- user dropdown - profile, settings, logout etc  -->
        <div>
          <AppHeaderDropdownAccnt />
        </div>
      </div>
    </CContainer>
    <!-- <CHeaderDivider />
    <CContainer fluid>
      <AppBreadcrumb />
    </CContainer> -->
  </CHeader>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

// import AppBreadcrumb from './AppBreadcrumb'
import AppHeaderDropdownAccnt from './AppHeaderDropdownAccnt'
import AppHeaderThemeSelector from './AppHeaderThemeSelector'

import getImgUrl from '@/helpers/get-img-helper'

export default {
  name: 'AppHeader',
  components: {
    // AppBreadcrumb,
    AppHeaderDropdownAccnt,
    AppHeaderThemeSelector,
  },
  data() {
    return {
      getImgUrl,
    }
  },
  methods: {
    ...mapMutations('memberModule', ['TOGGLE_DEV_ACL']),
  },
  computed: {
    ...mapState('memberModule', ['acl']),
    ...mapState(['sidebarVisible', 'theme']),
    showDevAclSwitch() {
      return process.env.VUE_APP_DEV_ACL === 'true' && this.acl
    },
  },
}
</script>

<style lang="scss">
.header {
  .my-header-logo {
    height: 42px;
    display: flex;
    align-items: center;
    padding-bottom: 8px;
  }
  .growth-pipe {
    padding-bottom: 4px;
  }
  .header-big-logo {
    width: 140px;
  }
  .header-small-logo {
    width: 30px;
  }
  .theme-selector-wrapper {
    padding-top: 1px;
  }
  .form-check-input:checked {
    background-color: #ff6600;
    border-color: #ff6600;
  }
}
</style>
