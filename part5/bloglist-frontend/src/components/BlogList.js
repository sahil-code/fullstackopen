import Blog from '../components/Blog'
import { connect } from 'react-redux'
import { sortBlogs } from '../reducers/blogReducer'

const BlogList = (props) => {
  return (
    <div>
      <button onClick={() => props.sortBlogs()}>sort blogs</button>
      {props.blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default connect((state) => ({ blogs: state.blogs }), {
  sortBlogs,
})(BlogList)
