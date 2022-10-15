import { connect } from 'react-redux'
import { useMatch } from 'react-router-dom'
import { ListGroup } from 'react-bootstrap'

const User = (props) => {
  const match = useMatch('/users/:id')
  const user = props.users.find((b) => b.id === match.params.id)
  if (!user) {
    return null
  }
  console.log(user)

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>{user.name}</h2>
      <h3>added blogs:</h3>
      <ListGroup>
        {user.blogs.map((blog) => (
          <ListGroup.Item key={blog.id}>{blog.title}</ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  )
}

export default connect((state) => ({ users: state.users }), null)(User)
