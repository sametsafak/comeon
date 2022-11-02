<template>
  <div>
    <h5 v-if="title" class="font-weight-bold mb-0">{{ title }}</h5>
    <div v-if="message" :class="{ 'mt-1': title }">{{ message }}</div>
  </div>
</template>
<script>
export default {
  name: 'TitleToast',
  props: {
    title: {
      required: true,
      type: String,
    },
    message: {
      required: true,
      type: String,
    },
  },
  methods: {
    onClickChat() {
      // Intercom('show')
    },
  },
}
</script>

<style lang="scss"></style>
