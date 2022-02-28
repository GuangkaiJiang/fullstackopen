const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

/*const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}*/

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })
  response.json(blogs)
  //Blog.find({}).then(blogs => {
  //  response.json(blogs)
  //})
})

blogsRouter.get('/:id', (request, response, next) => {
  Blog.findById(request.params.id)
    .then(blog => {
      if (blog) {
        response.json(blog)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body

  //const token = getTokenFrom(request)
  //const decodedToken = jwt.verify(token, process.env.SECRET)
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  //const user = await User.findById(decodedToken.id)
  const user = request.user
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
})

    
  if(!request.body.hasOwnProperty('title') && !request.body.hasOwnProperty('url'))
  {
    response.status(400).end()
  }
  else
  {
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.json(savedBlog)
  }
})

/*blogsRouter.delete('/:id', (request, response, next) => {
  Blog.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})*/
blogsRouter.delete('/:id', async (request, response,next) => {
  try {
      const decodedToken = jwt.verify(request.token, process.env.SECRET)

      if (!request.token || !decodedToken.id) {
          return response.status(401).json({ error: "token missing or invalid" })
      }

      //const user = await User.findById(decodedToken.id)
      const user = request.user
      const blog = await Blog.findById(request.params.id)
      if (blog.user.toString() !== decodedToken.id) 
      {
          return response.status(401).json({error: 'only the blog creator can delete the blog'})
      }
      else {
          await blog.remove()
          user.blogs = user.blogs.filter(blog => 
            {
              if (blog.id.toString() !== request.params.id.toString())
              {
                  return blog
              }
          }
          )
          await user.save()
          response.status(204).end()
      }

  }catch (e) {
      next(e)
  }
})

blogsRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const blog = {
    content: body.content,
    important: body.important,
  }

  Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .then(updatedBlog => {
      response.json(updatedBlog)
    })
    .catch(error => next(error))
})

module.exports = blogsRouter