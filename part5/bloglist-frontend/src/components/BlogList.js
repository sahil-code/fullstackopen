import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { sortBlogs } from '../reducers/blogReducer'
import BlogForm from './BlogForm'
import { Table, Button } from 'react-bootstrap'

const BlogList = (props) => {


  return (
    <div className="d-grid gap-2">
      <h2>List of Blogs</h2>
      <BlogForm />
      <Button onClick={() => props.sortBlogs()}>sort blogs</Button>
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
