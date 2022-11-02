<template>
  <div
    class="d-flex rounded border px-2 py-1 bg-gradient bg-opacity-75"
    :class="
      acl?.includes('DEV') ? 'bg-info border-primary text-white' : 'bg-light'
    "
  >
    <div class="d-flex align-items-center form-control-remove-margin-bottom">
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
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapState('memberModule', ['acl']),
  },
  methods: {
    ...mapMutations('memberModule', ['TOGGLE_DEV_ACL']),
  },
}
</script>

<style lang="scss" scoped></style>
