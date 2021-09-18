import axios from 'axios'

const api = axios.create({
  baseURL: process.env.API_ENDPOINT || 'localhost:3000'
})

export default api
// https://pets-backend-iulan.ondigitalocean.app'