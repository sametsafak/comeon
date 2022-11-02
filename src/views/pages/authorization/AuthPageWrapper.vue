<template>
  <div class="bg-light min-vh-100 d-flex flex-row align-items-center py-3">
    <CContainer>
      <CRow class="justify-content-center">
        <!-- :md="10" :lg="10" :xl="8" -->
        <CCol
          :md="$slots.rightContent ? 10 : 8"
          :lg="$slots.rightContent ? 12 : 7"
          :xl="$slots.rightContent ? 10 : 6"
          :xxl="$slots.rightContent ? 8 : 5"
        >
          <CRow>
            <CCol class="text-center mb-3">
              <router-link to="/pages/login">
                <img
                  class="width-250-px"
                  src="@/assets/brand/logo-dark.svg"
                  alt="comeon"
                />
              </router-link>
            </CCol>
          </CRow>
          <CRow
            class="make-cols-same-height g-0 rounded-2 overflow-hidden shadow-sm d-flex justify-content-center"
          >
            <CCol :lg="$slots.rightContent ? 6 : 12">
              <CCard class="p-4 rounded-0 shadow-none h-100">
                <CCardBody
                  class="d-flex align-items-center"
                  :class="{ 'justify-content-center': !$slots.rightContent }"
                >
                  <slot name="leftContent"></slot>
                </CCardBody>
              </CCard>
            </CCol>

            <CCol :lg="6" v-if="$slots.rightContent">
              <CCard
                class="text-white bg-primary py-5 h-100 rounded-0 shadow-none"
              >
                <CCardBody class="text-center">
                  <div
                    class="d-flex align-items-center flex-column justify-content-center h-100"
                  >
                    <slot name="rightContent"></slot>
                  </div>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>
