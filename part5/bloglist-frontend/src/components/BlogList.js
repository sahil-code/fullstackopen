import Blog from '../components/Blog'
import blogService from '../services/blogs'

const BlogList = ({ blogs, setBlogs, setNotification, user }) => {

  const updateLikes = async (blogToUpdate) => {
    try {
      const updatedBlog = await blogService.addLike(blogToUpdate)
      const newBlogs = blogs.map((blog) => blog.id === blogToUpdate.id ? updatedBlog : blog)
      setBlogs(newBlogs)
    }
    catch (exception) {
      setNotification({
        message: 'error' + exception.response.data.error,
        type: 'error'
      })
      setTimeout(() => { setNotification({}) }, 5000)
    }
  }

  const deleteBlog = async (blogId) => {
    try {
      await blogService.remove(blogId)
      const updatedBlogs = blogs.filter((blog) => blog.id !== blogId)
      setBlogs(updatedBlogs)
      setNotification({
        message: 'Blog removed',
        type: 'message'
      })
      setTimeout(() => { setNotification({}) }, 5000)
    }
    catch (exception) {
      setNotification({
        message: 'error' + exception.response.data.error,
        type: 'error'
      })
      setTimeout(() => { setNotification({}) }, 5000)
    }
  }


  return (
    <div>
      <button onClick={() => setBlogs([...blogs].sort((a, b) => b.likes - a.likes))}>sort blogs</button>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} updateLikes={updateLikes} deleteBlog={deleteBlog} user={user} />
      )}
    </div>
  )
}

export default BlogList