import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { sortBlogs } from '../reducers/blogReducer'
import BlogForm from './BlogForm'

const BlogList = (props) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div>
      <BlogForm />
      <button onClick={() => props.sortBlogs()}>sort blogs</button>
      {props.blogs.map((blog) => (
        <div style={blogStyle} key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>
            {blog.title}, {blog.author}
          </Link>
        </div>
      ))}
    </div>
  )
}

export default connect((state) => ({ blogs: state.blogs }), {
  sortBlogs,
})(BlogList)
