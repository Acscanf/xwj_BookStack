import axios from './config'

export const getBook = (page) => {
  return axios.get('/book', { params: { page } })
}