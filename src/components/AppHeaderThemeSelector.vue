<template>
  <CButtonGroup
    class="d-flex align-items-center theme-selector"
    aria-label="Theme switch"
  >
    <CFormCheck
      id="btn-light-theme"
      type="radio"
      name="theme-switch"
      autocomplete="off"
      :button="{ color: 'secondary', size: 'sm' }"
      :checked="theme === 'default'"
      @change="TOGGLE_THEME({ value: 'default' })"
    >
      <template #label><CIcon icon="cil-sun" /></template>
    </CFormCheck>
    <CFormCheck
      id="btn-dark-theme"
      type="radio"
      name="theme-switch"
      autocomplete="off"
      :button="{ color: 'dark', size: 'sm' }"
      :checked="theme === 'dark'"
      @change="TOGGLE_THEME({ value: 'dark' })"
    >
      <template #label><CIcon icon="cil-moon" /></template>
    </CFormCheck>
  </CButtonGroup>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  data() {
    return {}
  },
  computed: {
    ...mapState(['sidebarVisible', 'theme']),
  },
  methods: {
    ...mapMutations(['TOGGLE_THEME']),
  },
}
</script>
<style lang="scss">
.theme-selector {
  label {
    box-shadow: none !important;
    color: white;
  }
}
</style>
