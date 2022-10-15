import axios from 'axios'
const baseUrl = '/api/users'


const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject)
  return response.data
}

const userService = { getAll, create }
export default userService
