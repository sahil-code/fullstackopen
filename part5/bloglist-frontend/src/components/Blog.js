import { useState } from 'react'
import { connect } from 'react-redux'
import { voteFor, deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const Blog = ({ blog, ...props }) => {
  const [showDetails, setShowDetails] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const updateLikes = async (blogToUpdate) => {
    try {
      props.voteFor(blogToUpdate)
      props.setNotification({ message: 'blog liked', type: 'message' })
    } catch (exception) {
      props.setNotification({
        message: 'error' + exception.response.data.error,
        type: 'error',
      })
    }
  }

  const deleteBlog = async (blogToDelete) => {
    try {
      props.deleteBlog(blogToDelete)
      props.setNotification({
        message: 'Blog removed',
        type: 'message',
      })
    } catch (exception) {
      props.setNotification({
        message: 'error' + exception.response.data.error,
        type: 'error',
      })
    }
  }

  const BlogDetails = () => (
    <div className="DetailContent">
      <p>{blog.url}</p>
      <p>
        likes {blog.likes}
        <button id="like-button" onClick={() => updateLikes(blog)}>
          like
        </button>
      </p>
      <p>
        {blog.user.name}
        {blog.user.username === props.user.username && (
          <button
            id="delete-button"
            onClick={() => {
              if (
                window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)
              ) {
                deleteBlog(blog)
              }
            }}
          >
            delete
          </button>
        )}
      </p>
    </div>
  )

  return (
    <div style={blogStyle} className="blog">
      {blog.title} {blog.author}
      <button
        id="toggleView-button"
        onClick={() => setShowDetails(!showDetails)}
      >
        {showDetails ? 'hide' : 'view'}
      </button>
      {showDetails && <BlogDetails />}
    </div>
  )
}

export default connect((state) => ({ user: state.user }), {
  voteFor,
  deleteBlog,
  setNotification,
})(Blog)
