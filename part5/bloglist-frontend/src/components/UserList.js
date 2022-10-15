import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const UserList = (props) => {
  return (
    <div>
      <Table striped>
        <thead>
          <tr>
            <th>user</th>
            <th>number of blogs</th>
            <th>most liked blog</th>
          </tr>
        </thead>
        <tbody>
          {props.users.map((user) => (
            <tr className="user" key={user.username}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
              <td>{user.blogs.length > 0 ? user.blogs.reduce((highest, current) => highest.likes > current.likes ? highest : current).title : '-'}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default connect((state) => ({ users: state.users }), null)(UserList)
