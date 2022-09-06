import { useState } from 'react'
const Blog = ({ blog, updateLikes, username, deleteBlog }) => {

  const [showDetails, setShowDetails] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={() => setShowDetails(!showDetails)}>
          {showDetails ? 'hide' : 'view'}
        </button>
      </div>
      {showDetails &&
        <div>
          <p>{blog.url}</p>
          <p>likes {blog.likes}
            <button onClick={() => updateLikes(blog)}>like</button></p>
          <p>{blog.user.name}</p>
          {blog.user.username === username && (<button onClick={() => {
            if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {deleteBlog(blog.id)}
          }}>delete</button>
          )}

        </div>
      }
    </div>
  )
}

export default Blog