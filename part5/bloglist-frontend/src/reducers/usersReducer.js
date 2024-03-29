import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'

const usersReducer = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload
    },
    removeUsers() {
      return null
    },
    appendUser(state, action) {
      state.push(action.payload)
    },
  },
})

export const { setUsers, removeUsers, appendUser } = usersReducer.actions

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll()
    dispatch(setUsers(users))
  }
}

export default usersReducer.reducer
