import axios from 'axios'
import { corsAn } from './corsAnyw';

export default axios.create({
  baseURL: corsAn + 'https://todoreact-e4d4e.firebaseio.com/'
})