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
          <div class="d-flex align-items-center justify-content-center">
            <div>
              <h1 class="display-3 me-4">404</h1>
            </div>
            <div>
              <h4 class="pt-3">Oops! You're lost.</h4>
              <div class="text-medium-emphasis mb-2">
                The page you are looking for was not found.
              </div>
              <div class="mb-3">
                Click <router-link to="/">here</router-link> to go homepage
              </div>
            </div>
          </div>

          <!-- <CInputGroup class="input-prepend">
            <CInputGroupText>
              <CIcon icon="cil-magnifying-glass" />
            </CInputGroupText>
            <CFormInput type="text" placeholder="What are you looking for?" />
            <CButton color="primary">Search</CButton>
          </CInputGroup> -->
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
export default {
  name: 'Page404',
}
</script>
