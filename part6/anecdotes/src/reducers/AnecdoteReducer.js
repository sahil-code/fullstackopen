import { createSlice } from '@reduxjs/toolkit'

const initialState = [
  {
    text: 'If it hurts, do it more often',
    votes: 0,
    id: 0,
  },
  {
    text: 'Adding manpower to a late software project makes it later!',
    votes: 0,
    id: 1,
  },
  {
    text: 'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    votes: 0,
    id: 2,
  },
  {
    text: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    votes: 0,
    id: 3,
  },
  {
    text: 'Premature optimization is the root of all evil.',
    votes: 0,
    id: 4,
  },
  {
    text: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    votes: 0,
    id: 5,
  },
  {
    text: 'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients',
    votes: 0,
    id: 6,
  }
]

const anecdoteReducer = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    createAnecdote(state, action) {
      state.push({
        text: action.payload,
        votes: 0, 
        id: Number((Math.random() * 1000000).toFixed(0))
      })
    },
    voteFor(state, action) {
      return state.map(n => n.id !== action.payload ? n : { ...n, votes: n.votes + 1 })
    }
  },
})

export const { createAnecdote, voteFor } = anecdoteReducer.actions
export default anecdoteReducer.reducer