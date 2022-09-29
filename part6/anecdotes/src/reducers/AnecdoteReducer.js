import { createSlice } from '@reduxjs/toolkit'

const anecdoteReducer = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    voteFor(state, action) {
      return state.map(n => n.id !== action.payload ? n : { ...n, votes: n.votes + 1 })
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  },
})

export const { createAnecdote, voteFor, setAnecdotes } = anecdoteReducer.actions
export default anecdoteReducer.reducer