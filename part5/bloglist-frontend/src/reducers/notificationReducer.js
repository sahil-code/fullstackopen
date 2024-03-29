import { createSlice } from '@reduxjs/toolkit'

const notificationReducer = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    NotificationChange(state, action) {
      return action.payload
    },
    NotificationRemove() {
      return null
    }
  },
})

export const { NotificationChange, NotificationRemove } = notificationReducer.actions

let lastTimeout = null
export const setNotification = (content, time) => {
  return async dispatch => {
    dispatch(NotificationChange(content))
    clearTimeout(lastTimeout)
    lastTimeout = setTimeout(() => { dispatch(NotificationRemove()) }, (time ? time * 1000 : 5000))
  }
}

export default notificationReducer.reducer