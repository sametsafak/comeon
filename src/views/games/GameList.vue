<template>
  <div>
    <div class="game-item" :key="game.code" v-for="game in games">
      <div class="d-md-flex">
        <div
          class="pe-0 pe-md-2 mb-3 mb-sm-0 w-100 max-width-150-px mx-auto mx-md-0"
        >
          <img
            class="rounded overflow-hidden"
            :src="getImgUrl(game.icon)"
            :alt="game.name"
          />
        </div>
        <div>
          <h5>{{ game.name }}</h5>
          <div>{{ game.description }}</div>
          <div
            class="d-flex justify-content-center justify-content-md-end mt-3"
          >
            <router-link :to="'/game?gameCode=' + game.code">
              <CButton
                color="info"
                square
                class="px-4"
                v-tooltip="'Play ' + game.name + ' game!'"
              >
                <span class="pe-1">Play</span>
                <CIcon icon="cilMediaPlay" size="sm" />
              </CButton>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="text-center" v-if="games?.length === 0">No game found</div>
  </div>
</template>

<script>
import getImgUrl from '@/helpers/get-img-helper'

export default {
  data() {
    return {
      getImgUrl,
    }
  },
  props: {
    games: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style lang="scss" scoped>
.game-item {
  border-bottom: 1px solid lightgray;
  margin-bottom: 20px;
  padding-bottom: 20px;
  &:last-child {
    border-bottom: 0;
    margin-bottom: 0;
    padding-bottom: 5px;
  }
}

.dark-theme {
  .game-item {
    border-color: white;
  }
}
</style>
