import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { sortBlogs } from '../reducers/blogReducer'
import BlogForm from './BlogForm'
import { Table } from 'react-bootstrap'

const BlogList = (props) => {


  return (
    <div>
      <BlogForm />
      <button onClick={() => props.sortBlogs()}>sort blogs</button>
      <h2>Blogs</h2>

      <Table striped>
        <tbody>
          {props.blogs.map((blog) => (
            <tr key={blog.id}>
              <td>
                <Link to={`/blogs/${blog.id}`}>
                  {blog.title}, {blog.author}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default connect((state) => ({ blogs: state.blogs }), {
  sortBlogs,
})(BlogList)
