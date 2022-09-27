import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'

import { legacy_createStore as createStore } from 'redux'
import { Provider } from 'react-redux'
import anecdoteReducer from './reducers/AnecdoteReducer'

const store = createStore(anecdoteReducer)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>    <App />
  </Provider>)