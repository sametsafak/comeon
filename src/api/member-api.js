import httpClient from './http-client'

const login = (username, password, recaptchaToken) =>
  httpClient.post('login', {
    username,
    password,
    recaptchaToken,
  })
const logout = (username) => httpClient.post('logout', { username })

const getAcl = () =>
  httpClient.get('http://localhost:8080/fake-data/api/member/acl.json')

export default { login, getAcl, logout }
