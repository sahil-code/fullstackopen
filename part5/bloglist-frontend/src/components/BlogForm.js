import Togglable from '../components/Togglable'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { setNotification } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'
import useField from './UseField'
import { Form, Button } from 'react-bootstrap'

const BlogForm = (props) => {
  const title = useField('title', 'text')
  const author = useField('author', 'text')
  const url = useField('url', 'text')
  const navigate = useNavigate()

  const addBlog = async (event) => {
    event.preventDefault()
    try {
      console.log(title)
      const newBlog = await props.createBlog({
        title: title.value,
        author: author.value,
        url: url.value,
        likes: 0,
      })
      props.setNotification({ message: `Added ${title.value}` })
      navigate(`/blogs/${newBlog.id}`)
    } catch (exception) {
      props.setNotification({ error: 'error' + exception.response.data.error })
    }
  }

  return (
    <Togglable className="d-grid gap-2" buttonLabel="new blog" initState={false}>
      <h2>create new</h2>
      <Form onSubmit={addBlog}>
        {title.formelement}
        {author.formelement}
        {url.formelement}
        <Button variant="primary" type="submit">
          Save
        </Button>
      </Form>
    </Togglable>
  )
}

export default connect(null, { createBlog, setNotification })(BlogForm)
