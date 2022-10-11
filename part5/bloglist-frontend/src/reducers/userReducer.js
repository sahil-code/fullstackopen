import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'

const userReducer = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    removeUser() {
      return null
    },
  },
})

export const { setUser, removeUser } = userReducer.actions

let lastTimeout = null
export const loginUser = ({ username, password }) => {
  return async (dispatch) => {
    const user = await loginService.login({ username, password })
    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
    blogService.setToken(user.token)
    dispatch(setUser(user))
    clearTimeout(lastTimeout)
    lastTimeout = setTimeout(() => {
      dispatch(logoutUser())
    }, 60 * 60 * 1000)
  }
}

export const initializeUser = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }
}

export const logoutUser = () => {
  return async (dispatch) => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(setUser(null))
    blogService.setToken(null)
  }
}

export default userReducer.reducer
