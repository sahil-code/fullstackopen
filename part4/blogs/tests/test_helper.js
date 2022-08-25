const Blog = require('../models/blog')
const User = require("../models/user");

const initialBlogs = [
  {
    title: 'blogpost no 1',
    author: 'mr. a',
    url: 'abcd.com',
    likes: 2,
    user: "63065a601bce4137e65ca412"
  },
  {
    title: 'this is a very important blog',
    author: 'mr. important',
    url: 'importance.com',
    likes: 14
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  return blogs.map(blog => blog.toJSON())
}

const newBlog = {
  title: 'this is a new addition',
  author: 'mr. addition',
  url: 'abcd.com',
  likes: 24,
}

const newUser = {
  username: "user2",
  name: "name2",
  blogs: [],
  _id: "63065a601bce4137e65ca412"
}

const usersInDb = async () => {
  const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1 })
  return users.map((user) => user.toJSON())
};

module.exports = {
  initialBlogs, blogsInDb, newBlog, newUser, usersInDb
}