<template>
  <CCard class="mb-4">
    <CCardBody class="text-center">
      <div id="game-launch"></div>
      <router-link :to="'/games'">
        <CButton color="info" square size="sm">
          <span class="pe-1">Check other games!</span>
        </CButton>
      </router-link>
    </CCardBody>
  </CCard>
</template>

<script>
import '@/lib/comeon.game-1.0.min.js'

export default {
  mounted() {
    this.playGame()
  },
  methods: {
    playGame() {
      const gameCode = this.$route.query?.gameCode
      if (gameCode) {
        window.comeon.game.launch(gameCode)
        return
      }
      this.$toast.warning('Game not found!')
      this.$router.push('/games')
    },
  },
}
</script>

<style lang="scss">
#game-launch iframe {
  width: 100% !important;
  max-width: 640px;
}
</style>
