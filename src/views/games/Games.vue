<template>
  <div>
    <!-- Dev is a component to help development. It's only visible if DEV acl is active -->
    <Dev :vm="this" />
    <CRow>
      <CCol>
        <CCard class="mb-4">
          <CCardHeader>
            <div class="d-flex justify-content-between align-items-center">
              <div>Games</div>
              <div>
                <CFormInput
                  size="sm"
                  placeholder="Search Game"
                  v-model="searchText"
                />
              </div>
            </div>
          </CCardHeader>
          <CCardBody>
            <div class="d-flex mb-3 justify-content-center">
              <CButtonGroup
                role="group"
                class="d-flex period-wrapper flex-wrap max-width-350-px"
              >
                <template :key="category.id" v-for="category in categories">
                  <CFormCheck
                    type="radio"
                    name="periodSelector"
                    autocomplete="off"
                    :label="category.name"
                    :id="'category-' + category.id"
                    :value="category.id"
                    :checked="selectedCategory?.id === category.id"
                    :button="{ color: 'primary', variant: 'outline' }"
                    @click="onCategorySelected(category)"
                  />
                </template>
              </CButtonGroup>
            </div>

            <div class="mb-4">
              <div>
                Hello <b>{{ member?.name }}!</b>
              </div>
              <div>{{ member?.event }}</div>
            </div>

            <GamesList :games="filteredGames" />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import gamesApi from '@/api/games-api'
import GamesList from './GameList.vue'
import { mapState } from 'vuex'

export default {
  components: {
    GamesList,
  },
  data() {
    return {
      games: null,
      categories: null,
      loading: true,
      selectedCategory: {
        id: 0,
      },
      searchText: '',
    }
  },
  async mounted() {
    await this.getGames()
    await this.getCategories()
  },
  computed: {
    ...mapState('memberModule', ['member']),
    filteredGames() {
      const byCategory = this.games?.filter((game) =>
        game.categoryIds.includes(this.selectedCategory.id),
      )

      const bySearch = byCategory?.filter((game) => {
        const name = game.name.toLowerCase()
        const desc = game.description.toLowerCase()
        const searchText = this.searchText.toLowerCase()
        return name.includes(searchText) || desc.includes(searchText)
      })

      return bySearch
    },
  },
  methods: {
    async getGames() {
      try {
        const res = await gamesApi.getGames()
        this.games = res.data
      } catch (error) {
        this.$errorHandler(error)
      }
    },
    async getCategories() {
      try {
        const res = await gamesApi.getCategories()
        this.categories = res.data
      } catch (error) {
        this.$errorHandler(error)
      }
    },
    onCategorySelected(category) {
      this.selectedCategory = category
    },
  },
}
</script>
