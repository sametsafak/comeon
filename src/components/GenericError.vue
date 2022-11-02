<template>
  <div>
    We're sorry, an unexpected error has occured. If the issue persists,
    <button class="btn btn-sm btn-warning click-here-btn" @click="onClickChat">
      Click Here
    </button>
    to chat with one of our operators for help.
  </div>
</template>

<script>
export default {
  name: 'GenericError',
  methods: {
    onClickChat() {
      window.Intercom('show')
    },
  },
}
</script>
