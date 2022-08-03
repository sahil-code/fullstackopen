var lodash = require('lodash')

const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }

  return blogs.reduce(reducer, 0)
}

const favouriteBlog = (blogs) => {
  var favBlog = lodash.maxBy(blogs, 'likes')
  return {
    'title': favBlog.title,
    'author': favBlog.author,
    'likes': favBlog.likes
  }
}

const mostBlogs = (blogs) => {
  var authorList = {}
  lodash.map(blogs, 'author').forEach(author => authorList[author] = 0)

  blogs.forEach((blog) => {
    authorList[blog.author]++
  })

  return lodash.maxBy(lodash.map(authorList, ((blogs, author) => ({ author, blogs }))), 'blogs')
}

const mostLikes = (blogs) => {
  var authorList = {}
  lodash.map(blogs, 'author').forEach(author => authorList[author] = 0)

  blogs.forEach((blog) => {
    authorList[blog.author]+= blog.likes
  })

  return lodash.maxBy(lodash.map(authorList, ((likes, author) => ({ author, likes }))), 'likes')
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes
}