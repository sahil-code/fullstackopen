import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogReducer = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload)
    },
    updateBlog(state, action) {
      return state.map((n) => (n.id !== action.payload.id ? n : action.payload))
    },
    removeBlog(state, action) {
      return state.filter((n) => n.id !== action.payload.id)
    },
    setBlogs(state, action) {
      return action.payload
    },
    sortBlogs(state) {
      return state.sort((a, b) => b.likes - a.likes)
    },
  },
})

export const { appendBlog, updateBlog, setBlogs, removeBlog, sortBlogs } =
  blogReducer.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (content) => {
  return async (dispatch) => {
    const newNote = await blogService.create(content)
    dispatch(appendBlog(newNote))
  }
}

export const voteFor = (content) => {
  return async (dispatch) => {
    const newNote = await blogService.addLike(content)
    dispatch(updateBlog(newNote))
  }
}

export const deleteBlog = (content) => {
  return async (dispatch) => {
    await blogService.remove(content.id)
    dispatch(removeBlog(content))
  }
}

export default blogReducer.reducer
