import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const create = async (newObject) => {
  const config = { headers: { Authorization: token } }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, newObject) => {
  const request = await axios.put(`${baseUrl}/${id}`, newObject)
  return request.data
}

const remove = async (id) => {
  const config = { headers: { Authorization: token } }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

const addLike = async (id) => {
  const request = await axios.put(`${baseUrl}/${id}/like`)
  return request.data
}

const addComment = async (content) => {
  const request = await axios.post(`${baseUrl}/${content.id}/comments`, {
    comment: content.comment,
  })
  return request.data
}

const blogService = {
  getAll,
  create,
  update,
  setToken,
  addLike,
  remove,
  addComment,
}
export default blogService
