<template>
  <CDropdown
    class="header-account-dropdown"
    variant="nav-item"
    :auto-close="'outside'"
    @hide="visible = false"
    @show="visible = true"
    :visible="visible"
  >
    <CDropdownToggle placement="bottom-end" class="py-0 px-0" :caret="false">
      <CAvatar :src="getImgUrl(member?.avatar)" size="md" />
    </CDropdownToggle>
    <CDropdownMenu
      class="pt-0 max-width-300-px"
      @click="checkIfDropdownShouldBeHidden"
    >
      <CDropdownHeader
        component="h6"
        class="bg-light fw-semibold py-2 rounded-top"
      >
        <div class="d-flex">
          <span class="me-2">Account</span>
        </div>
      </CDropdownHeader>
      <div
        class="text-muted px-3 pt-2 max-width-300-px text-truncate"
        :title="member?.name"
      >
        {{ member?.name }}
      </div>

      <div
        v-if="acl?.includes('DEV')"
        class="m-2 p-2 border rounded border-primary shadow-sm fs-13"
      >
        <div class="text-primary"><b>dev info</b></div>
        <div class="overflow-auto max-height-250-px">
          <div class="text-warning"><b>member</b></div>
          <pre>{{ member }}</pre>
          <div class="text-warning"><b>acl</b></div>
          <pre>{{ acl }}</pre>
        </div>
      </div>

      <CDropdownDivider />

      <!-- hidden for desktop, visible for tablet and mobile -->
      <div class="d-block d-lg-none">
        <!-- theme selector -->
        <div class="px-3">
          <AppHeaderThemeSelector />
        </div>

        <CDropdownDivider />

        <!-- dev only switch -->
        <div v-if="showDevAclSwitch">
          <div class="px-3">
            <DevSwitch />
          </div>
          <CDropdownDivider />
        </div>
      </div>

      <CDropdownItem @click="onClickLogout">
        <CIcon icon="cil-account-logout" class="me-1" /> Logout
      </CDropdownItem>
    </CDropdownMenu>
  </CDropdown>
</template>

<script>
import avatar from '@/assets/images/avatar/default-user.png'
import AppHeaderThemeSelector from './AppHeaderThemeSelector'
import DevSwitch from './DevSwitch'

import getImgUrl from '@/helpers/get-img-helper'

import { mapState, mapActions } from 'vuex'
export default {
  name: 'AppHeaderDropdownAccnt',
  components: {
    AppHeaderThemeSelector,
    DevSwitch,
  },
  data() {
    return {
      avatar,
      visible: null,
      getImgUrl,
    }
  },
  methods: {
    ...mapActions('memberModule', ['LOGOUT_MEMBER']),
    async onClickLogout() {
      try {
        await this.LOGOUT_MEMBER()
      } catch (error) {
        this.$errorHandler(error)
      }
    },
    checkIfDropdownShouldBeHidden(e) {
      // if a link or dropdown item clicked, hide the dropdown
      // if clicked item is not a dropdown item, do nothing
      if (e.target.closest('.dropdown-item')) {
        this.visible = false
      }
    },
  },
  computed: {
    ...mapState('memberModule', ['acl', 'member']),
    showDevAclSwitch() {
      return process.env.VUE_APP_DEV_ACL === 'true' && this.acl
    },
  },
}
</script>
