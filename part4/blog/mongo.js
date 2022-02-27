const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
`mongodb+srv://kai:${password}@realmcluster.s0qh3.mongodb.net/myblog?retryWrites=true&w=majority`

mongoose.connect(url)

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)
/*
const blog = new Blog({
  title: 'blog1',
  author: 'auth1',
  url: 'www.example.com',
  likes: 1
})

blog.save().then(() => {
  console.log('blog saved!')
  mongoose.connection.close()
})
*/

Blog.find({}).then(result => {
  result.forEach(blog => {
    console.log(blog.title)
  })
  mongoose.connection.close()
})