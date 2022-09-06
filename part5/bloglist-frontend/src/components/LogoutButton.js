import blogService from '../services/blogs'

const LogoutButton = ({ user, setUser, setNotification }) => {

  const handleLogout = async (event) => {
    event.preventDefault()
    try {
      window.localStorage.removeItem('loggedBlogappUser')
      blogService.setToken(null)
      setUser(null)
    }
    catch (exception) {
      setNotification({
        message: 'Error Logging Out',
        type: 'error'
      })
      setTimeout(() => {
        setNotification({
          message: null,
          type: 'error'
        })
      }, 5000)
    }
  }

  return (
    <p>
      {user.name} logged-in
      <button onClick={handleLogout}>logout</button>
    </p>
  )
}

export default LogoutButton