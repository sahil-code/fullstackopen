import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => axios.get(baseUrl).then(response => response.data)

const create = newObject => axios.post(baseUrl, newObject).then(response => response.data)

const update = (id, newObject) => axios.put(`${baseUrl}/${id}`, newObject).then(response => response.data)

const deleteperson = (deleteid) => axios.delete(`${baseUrl}/${deleteid}`).then(response => response.data)

export default { getAll, create, update, deleteperson }