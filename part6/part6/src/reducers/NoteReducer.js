const noteReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_NOTE':
      return [...state, action.data]
    case 'TOGGLE_IMPORTANCE': {
      return state.map(n => n.id !== action.data.id ? n : { ...n, important: !n.important })
    }
    default:
      return state
  }
}

export default noteReducer