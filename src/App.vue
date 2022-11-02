<template>
  <router-view />
</template>
<script>
import { mapState } from 'vuex'

export default {
  name: 'App',
  computed: {
    ...mapState(['theme']),
  },
  watch: {
    theme: {
      handler: function (newTheme) {
        newTheme === 'dark'
          ? document.body.classList.add('dark-theme')
          : document.body.classList.remove('dark-theme')
      },
      immediate: true,
    },
    $route: {
      immediate: true,
      handler(to) {
        document.title = `Comeon | ${to.name || ''}`
      },
    },
  },
}
</script>

<style lang="scss">
// Import Main styles for this application
@import 'styles/style';
</style>
