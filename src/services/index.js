import axios from 'axios'
import GithubService from './github'

const HTTPClient = axios.create({
  baseURL: 'https://api.github.com'
})

export default {
  github: GithubService(HTTPClient)
}
