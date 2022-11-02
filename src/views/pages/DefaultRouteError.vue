<template>
  <div class="bg-light min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="6">
          <h1 class="display-3 me-4 text-center">Authorization Error</h1>
          <h4 class="pt-3 text-center">Houston, we have a problem!</h4>
          <div class="text-medium-emphasis float-start text-center mb-3">
            The page you are looking for is temporarily unavailable. There is
            something wrong with your authorization (ACL). Try to go
            <router-link to="/">homepage</router-link> and please contact us.
          </div>
          <div class="text-medium-emphasis text-center mb-4">
            <div class="mb-2">Or try to login again.</div>
            <div>
              <CButton color="primary" @click="onClickLogout">Login</CButton>
            </div>
          </div>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

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
  },
  computed: {
    ...mapState('memberModule', ['member']),
  },
}
</script>
