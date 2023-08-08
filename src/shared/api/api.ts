import axios from 'axios'
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage'

const authorizationToken = localStorage.getItem(USER_LOCALSTORAGE_KEY as string)
const authorizationHeaderValue = authorizationToken !== null ? authorizationToken : ''

export const api = axios.create({
  baseURL: __API_URL__,
  headers: {
    authorization: authorizationHeaderValue,
  },
})
