<template>
  <CFooter>
    <div class="fw-light fs-13">
      <a
        href="https://www.comeon-group.com/"
        class="text-info text-decoration-none"
        target="_blank"
        >Comeon</a
      >
      <span class="ms-1">
        &copy; {{ new Date().getFullYear() }} Copyright, All Rights Reserved.
      </span>
    </div>
  </CFooter>
</template>

<script>
export default {
  name: 'AppFooter',
}
</script>
