<template>
  <AuthPageWrapper>
    <template v-slot:leftContent>
      <VeeForm
        v-slot="{ handleSubmit }"
        :validation-schema="schema"
        class="w-100"
        ref="myForm"
        as="div"
      >
        <form @submit="handleSubmit($event, onSubmit)">
          <h1>Login</h1>
          <p class="text-medium-emphasis">Sign in to your account</p>
          <Field
            name="username"
            v-slot="{ field, /* errors */ errorMessage, meta }"
          >
            <CInputGroup class="mb-3">
              <CInputGroupText>
                <CIcon icon="cil-user" />
              </CInputGroupText>
              <CFormInput
                placeholder="Username"
                autocomplete="username"
                v-bind="field"
                :invalid="!!errorMessage"
                :valid="meta.valid && meta.touched"
              />
              <CFormFeedback invalid>
                {{ errorMessage }}
              </CFormFeedback>
            </CInputGroup>
          </Field>
          <Field
            name="password"
            v-slot="{ field, /* errors */ errorMessage, meta }"
          >
            <CInputGroup class="mb-4">
              <CInputGroupText>
                <CIcon icon="cil-lock-locked" />
              </CInputGroupText>
              <CFormInput
                type="password"
                placeholder="Password"
                autocomplete="current-password"
                v-bind="field"
                :invalid="!!errorMessage"
                :valid="meta.valid && meta.touched"
              />
              <CFormFeedback invalid class="mb-4">
                {{ errorMessage }}
              </CFormFeedback>
            </CInputGroup>
          </Field>
          <CRow class="d-flex align-items-center">
            <CCol :xs="6">
              <CButton
                color="primary"
                class="px-4"
                type="submit"
                :class="{ 'loading-spinner': loading }"
              >
                Login
              </CButton>
            </CCol>
            <CCol :xs="6" class="text-right">
              <CButton color="link" class="px-0" type="button">
                <router-link to="/pages/forgot-password">
                  Forgot password?
                </router-link>
              </CButton>
            </CCol>
          </CRow>
        </form>
      </VeeForm>
    </template>
  </AuthPageWrapper>
</template>

<script>
import AuthPageWrapper from '@/views/pages/authorization/AuthPageWrapper'

import { Form as VeeForm, Field } from 'vee-validate'
import * as yup from 'yup'
import { mapActions, mapState, mapMutations } from 'vuex'

export default {
  name: 'Login',
  components: {
    Field,
    // Rename form to avoid confusion with native `form`
    VeeForm,
    // ErrorMessage,
    AuthPageWrapper,
  },
  data: () => {
    const schema = yup.object({
      username: yup.string().required(),
      password: yup.string().required().min(3),
    })

    return {
      schema,
      loading: false,
    }
  },
  methods: {
    ...mapActions('memberModule', ['LOGIN_MEMBER']),
    ...mapMutations('memberModule', ['SET_MEMBER']),
    async onSubmit(values) {
      this.loading = true

      try {
        const res = await this.LOGIN_MEMBER({
          formData: values,
        })

        this.SET_MEMBER(res.data.player)

        let redirectRoute =
          this.$router.currentRoute.value.query?.redirectAfterLogin

        if (this.isAdmin) {
          // admin should select a member first
          // if redirected url has request that requires member info, api returns 401
          // then router redirects to login page again. we don't want that endless loop.
          redirectRoute = null
        }

        this.$router.push(redirectRoute || this.defaultRoute)
      } catch (error) {
        this.loading = false
        this.$errorHandler(error)
      }
    },
  },
  computed: {
    ...mapState('memberModule', ['defaultRoute', 'isAdmin']),
  },
}
</script>
