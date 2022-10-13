import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const UserList = (props) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <td>user</td>
            <td>number of blogs</td>
          </tr>
        </thead>
        <tbody>
          {props.users.map((user) => (
            <tr className="user" key={user.username}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default connect((state) => ({ users: state.users }), null)(UserList)
