const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'blogpost no 1',
    author: 'mr. a',
    url: 'abcd.com',
    likes: 2
  },
  {
    title: 'this is a very important blog',
    author: 'mr. important',
    url: 'importance.com',
    likes: 14
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const newBlog = {
  title: 'this is a new addition',
  author: 'mr. addition',
  url: 'abcd.com',
  likes: 24
}

module.exports = {
  initialBlogs, blogsInDb, newBlog
}