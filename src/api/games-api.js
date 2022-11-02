import httpClient from './http-client'

const getGames = () => httpClient.get('games')
const getCategories = () => httpClient.get('categories')

export default {
  getGames,
  getCategories,
}
