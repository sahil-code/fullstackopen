import { useApolloClient } from '@apollo/client'

const Authors = ({ setToken }) => {
  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <button onClick={logout}>logout</button>
  )
}

export default Authors
