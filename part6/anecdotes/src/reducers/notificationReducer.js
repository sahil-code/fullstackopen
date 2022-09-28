import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    NotificationChange(state, action) {
      return action.payload
    },
    RemoveNotification(state) {
      return null
    }
  },
})

export const { NotificationChange } = notificationSlice.actions
export default notificationSlice.reducer