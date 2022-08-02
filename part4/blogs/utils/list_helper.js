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
  //pending for now
  return blogs
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog
}