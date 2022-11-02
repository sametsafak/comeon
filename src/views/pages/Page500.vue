<template>
  <div class="bg-light min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="6">
          <div class="mb-5 text-center">
            <router-link to="/">
              <img
                class="width-250-px"
                src="@/assets/brand/logo-dark.svg"
                alt="comeon"
              />
            </router-link>
          </div>
          <div class="d-flex align-items-center">
            <div>
              <h1 class="display-3 me-4 mt-1">500</h1>
            </div>
            <div>
              <h4>Houston, we have a problem!</h4>
              <div class="text-medium-emphasis float-start">
                We're sorry, an unexpected error has occured. If the issue
                persists,
              </div>
            </div>
          </div>
          <div class="text-center text-medium-emphasis fs-14 mt-3">
            <a class="cursor-pointer" @click="onClickChat">Click here</a>
            to chat with one of our operators for help. Try to go
            <router-link to="/">homepage</router-link> and please contact us or
            try to
            <a class="cursor-pointer" @click="onClickLogout">login</a> again.
          </div>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Page500',
  methods: {
    ...mapActions('memberModule', ['LOGOUT_MEMBER']),
    async onClickLogout() {
      try {
        await this.LOGOUT_MEMBER()
      } catch (error) {
        this.$errorHandler(error)
      }
    },
    onClickChat() {
      window.Intercom('show')
    },
  },
}
</script>
