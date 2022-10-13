import { connect } from 'react-redux'
import { useMatch } from 'react-router-dom'

const User = (props) => {
  const match = useMatch('/users/:id')
  const user = props.users.find((b) => b.id === match.params.id)
  if (!user) {
    return null
  }
  console.log(user)

  return (
    <div>
      <h1>{user.name}</h1>
      <p>added blogs:</p>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default connect((state) => ({ users: state.users }), null)(User)
