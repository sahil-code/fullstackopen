import { connect } from 'react-redux'
import { voteFor, deleteBlog, commentOn } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useMatch } from 'react-router-dom'
import { ListGroup, Form, Button, Card } from 'react-bootstrap'

const Blog = (props) => {
  const match = useMatch('/blogs/:id')
  const blog = props.blogs.find((b) => b.id === match.params.id)

  if (!blog) {
    return null
  }

  const updateLikes = async (id) => {
    try {
      props.voteFor(id)
      props.setNotification({ message: 'blog liked' })
    } catch (exception) {
      props.setNotification({ error: 'error' + exception.response.data.error })
    }
  }

  const deleteBlog = async (blogToDelete) => {
    try {
      props.deleteBlog(blogToDelete)
      props.setNotification({ message: 'Blog removed' })
    } catch (exception) {
      props.setNotification({ error: 'error' + exception.response.data.error })
    }
  }

  const addComment = async (event) => {
    console.log(event)
    event.preventDefault()
    props.commentOn({
      id: blog.id,
      comment: event.target[0].value,
    })
    props.setNotification({ message: 'added comment!' })
    event.target.comment.value = ''
  }

  return (
    <div>
      <Card bg="primary" text="white">
        <Card.Body>
          <Card.Title>
            <h2 style={{ textAlign: 'center' }}>
              {blog.title}, {blog.author}{' '}
            </h2>
          </Card.Title>
          <Card.Text>
            url: {blog.url}
            <br></br>
            created by: {blog.user.name}
          </Card.Text>
          <Button
            id="like-button"
            variant="secondary"
            onClick={() => updateLikes(blog.id)}
          >
            likes: {blog.likes}
          </Button>
          {props.user && (
            <div>
              {blog.user.username === props.user.username && (
                <Button
                  id="delete-button"
                  variant="secondary"
                  onClick={() => {
                    if (
                      window.confirm(
                        `Remove blog ${blog.title} by ${blog.author}?`
                      )
                    ) {
                      deleteBlog(blog)
                    }
                  }}
                >
                  delete blog
                </Button>
              )}
            </div>
          )}
        </Card.Body>
      </Card>
      <h3>comments</h3>
      <ListGroup variant="flush">
        {blog.comments.map((comment, i) => (
          <ListGroup.Item key={i}>{comment}</ListGroup.Item>
        ))}
      </ListGroup>
      <Form onSubmit={addComment}>
        <Form.Group>
          <Form.Label>comment</Form.Label>
          <Form.Control type="text" placeholder="enter comment..." />
        </Form.Group>
        <Button variant="primary" type="submit">
          add comment
        </Button>
      </Form>
    </div>
  )
}

export default connect((state) => ({ user: state.user, blogs: state.blogs }), {
  voteFor,
  deleteBlog,
  commentOn,
  setNotification,
})(Blog)
