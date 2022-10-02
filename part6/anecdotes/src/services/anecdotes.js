import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (text) => {
  const object = { text, votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const increaseVote = async (id) => {
  const originalAnecdote = await axios.get(`${baseUrl}/${id}`)
  const updatedAnecdote = { ...originalAnecdote.data, votes: originalAnecdote.data.votes + 1}
  const response = await axios.put(`${baseUrl}/${id}`, updatedAnecdote)
  return response.data
}

const anecdoteService = { getAll, createNew, increaseVote }
export default anecdoteService