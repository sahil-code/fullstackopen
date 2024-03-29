import axios from 'axios'
const baseUrl = '/api/notes'

let token = null

const setToken = newToken => { token = `bearer ${newToken}` }

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const create = async newObject => {
  const config = { headers: { Authorization: token }, }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, newObject) => {
  const request = await axios.put(`${baseUrl}/${id}`, newObject)
  return request.data
}

const noteService = { getAll, create, update, setToken }
export default noteService