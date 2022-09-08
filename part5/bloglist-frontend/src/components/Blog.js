import { useState } from 'react'
const Blog = ({ blog, updateLikes, user, deleteBlog }) => {

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
        <div className="DetailContent">
          <p>{blog.url}</p>
          <p>likes {blog.likes}
            <button onClick={() => updateLikes(blog)}>like</button></p>
          <p>{blog.user.name}
            {blog.user.username === user.username && (<button onClick={() => {
              if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) { deleteBlog(blog.id) }
            }}>delete</button>
            )}
          </p>
        </div>
      }
    </div>
  )
}

export default Blog