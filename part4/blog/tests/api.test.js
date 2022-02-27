const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const helper = require('./test_helper')


beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('the correct amount of blog', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('unique identifier is id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })

test('a valid blog can be added ', async () => {
  const newBlog = {
    _id: "12345a851b54a676234d17f7",
    title: "test post",
    author: "Someone Chan",
    url: "https://example.com/",
    likes: 4,
    __v: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const contents = blogsAtEnd.map(n => n.title)
  expect(contents).toContain(
    'test post'
  )
})

test('added blog with missing likes property has default value 0', async () => {
    const newBlog = {
      _id: "123456851b54a676234d17f7",
      title: "test post2",
      author: "Someone Li",
      url: "https://example.com/",
      __v: 0
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd[helper.initialBlogs.length].likes).toBeDefined()
    expect(blogsAtEnd[helper.initialBlogs.length].likes).toEqual(0)
  })

  test('if missing title and url, get 400', async () => {
    const newBlog = {
        _id: "123456751b54a676234d17f7",
        author: "Someone Zhang",
        __v: 0
      }
    
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })

test('a blog can be deleted', async () => {
const blogsAtStart = await helper.blogsInDb()
const blogToDelete = blogsAtStart[0]

await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

const blogsAtEnd = await helper.blogsInDb()

expect(blogsAtEnd).toHaveLength(
    helper.initialBlogs.length - 1
)

const contents = blogsAtEnd.map(r => r.id)

expect(contents).not.toContain(blogToDelete.content)
})

test('a specific blog can be viewed', async () => {
    const blogsAtStart = await helper.blogsInDb()
  
    const blogToView = blogsAtStart[0]
  
    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    const processedBlogToView = JSON.parse(JSON.stringify(blogToView))
  
    expect(resultBlog.body).toEqual(processedBlogToView)
  })

test('a specific blog can be updated', async () => {
const testid='5a422b891b54a676234d17fa'
const blog=
{
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 100,
    __v: 0
  }

await api
    .put(`/api/blogs/${testid}`, blog)
    .expect('Content-Type', /application\/json/)
    .expect(200)
})

afterAll(() => {
  mongoose.connection.close()
})