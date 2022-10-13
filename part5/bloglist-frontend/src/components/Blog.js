import { connect } from 'react-redux'
import { voteFor, deleteBlog, commentOn } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useMatch } from 'react-router-dom'

const Blog = (props) => {
  const match = useMatch('/blogs/:id')
  const blog = props.blogs.find((b) => b.id === match.params.id)
  if (!blog) {
    return null
  }

  const updateLikes = async (id) => {
    try {
      props.voteFor(id)
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

  const addComment = async (event) => {
    event.preventDefault()
    const content = {
      id: blog.id,
      comment: event.target.comment.value
    }
    event.target.comment.value = ''
    props.commentOn(content)
    props.setNotification({
      message: 'added comment!',
      type: 'message',
    })
  }

  return (
    <div className="blog">
      <h1>
        {blog.title}, {blog.author}
      </h1>
      <p>{blog.url}</p>
      <p>
        likes {blog.likes}
        <button id="like-button" onClick={() => updateLikes(blog.id)}>
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
      <h2>comments</h2>
      <form onSubmit={addComment}>
        <input name="comment" />
        <button type="submit">add comment</button>
      </form>
      <ul>
        {blog.comments.map((comment, i) => (
          <li key={i}>{comment}</li>
        ))}
      </ul>
      <p></p>
    </div>
  )
}

export default connect((state) => ({ user: state.user, blogs: state.blogs }), {
  voteFor,
  deleteBlog,
  commentOn,
  setNotification,
})(Blog)
