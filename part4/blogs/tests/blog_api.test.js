const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObjects = helper.initialBlogs.map(b => new Blog(b))
  const promiseArray = blogObjects.map(b => b.save())
  await Promise.all(promiseArray)
})


describe('when there is initially some blogs saved', () => {
  test('there are correct number of blogs', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const titles = response.body.map(r => r.title)

    expect(titles).toContain(helper.initialBlogs[0].title)
  })

  test('there is id field defined', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })

})

describe('adding blogs', () => {

  let token = null
  beforeAll(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('password2', 10)
    const user = new User({ passwordHash, ...helper.newUser })
    await user.save()

    const userForToken = { username: user.username, id: user._id }
    token = jwt.sign(userForToken, process.env.SECRET)
  })

  test('a valid blog can be added', async () => {
    const newBlog = helper.newBlog

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsatEnd = await helper.blogsInDb()
    expect(blogsatEnd).toHaveLength(helper.initialBlogs.length + 1)

    expect(blogsatEnd.map(r => r.title)).toContain(newBlog.title)
    expect(blogsatEnd.map(r => r.author)).toContain(newBlog.author)
  })

  test('blog with no likes takes 0', async () => {
    // eslint-disable-next-line no-unused-vars
    const { likes, ...newBlog } = helper.newBlog
    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const blogsatEnd = await helper.blogsInDb()
    expect(blogsatEnd.find(b => b.title === newBlog.title).likes).toBe(0)
  })

  test('no title and url is bad request', async () => {
    // eslint-disable-next-line no-unused-vars
    const { title, url, ...newBlog } = helper.newBlog
    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    const blogsatEnd = await helper.blogsInDb()
    expect(blogsatEnd).toHaveLength(helper.initialBlogs.length)
  })
})

describe('deleting blogs', () => {

  test('succeeds with status code 204 if id is valid', async () => {
    await User.deleteMany({})
    await Blog.deleteMany({})

    const passwordHash = await bcrypt.hash('password2', 10)
    const user = new User({ passwordHash, ...helper.newUser })
    await user.save()

    const userForToken = { username: user.username, id: user._id }
    token = jwt.sign(userForToken, process.env.SECRET)

    const newBlog = helper.newBlog
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)

    // eslint-disable-next-line no-unused-vars  
    const { title, ...secondBlog } = helper.newBlog
    secondBlog.title = "second blog"

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(secondBlog)

    const blogsAtStart = await helper.blogsInDb()
    const blogDeleted = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogDeleted.id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

    const titles = blogsAtEnd.map(r => r.title)
    expect(titles).not.toContain(blogDeleted.title)
  })
})

describe('updating blogs', () => {
  test('succeeds with status code 200 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send({ likes: 42 })
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    const updatedBlog = blogsAtEnd[0]
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    expect(updatedBlog.likes).toBe(42)
  })
})

afterAll(() => {
  mongoose.connection.close()
})