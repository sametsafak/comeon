import axios from 'axios'

const httpClient = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// check and set auth releated headers
const requestInterceptors = (config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token
    return config
  }
  delete config.headers['Authorization']
  return config
}

httpClient.interceptors.request.use(requestInterceptors)

export default httpClient
