import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import {Notification, Warning} from './components/Notification'
import loginService from './services/login'
import NewBlogForm from "./components/NewBlogForm";
import Toggle from "./components/Toggle";

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [msg, setMsg] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      console.log('logging in with', username, password)

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
/////////////////////////////////////////////////////////////////
  const handleCreateBlog =  (blog) => {
    blogService
        .create(blog)
        .then(res => {
            setBlogs(blogs.concat(res))
        })

    setMsg(
        `a new blog ${blog.title} by ${blog.author} added`
    )
    setTimeout(() => {
        setMsg(null)
    }, 5000)
}

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )
  const newBlogForm = () => (
    <Toggle buttonLabel="Create">
        <NewBlogForm
            createBlog={handleCreateBlog}
        />
    </Toggle>
)

  const listblogs=()=>{
    return (
      <div>
        <h2>blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} update={putblog} del={deleteblog}/>
        )}
      </div>
    )
  }

  const putblog = async (id,blog) => {
    const Blog = { ...blog }
    Blog.likes = Blog.likes + 1
    await blogService.update(id,Blog)
    const res = blogs.map((a) =>
        a.id === Blog.id ? Blog : a
    )
    setBlogs(res)
}

const deleteblog = (id) => {
  const blogToDelete = blogs.find(b => b.id === id)
  if (window.confirm(`Remove blog '${blogToDelete.title}' by '${blogToDelete.author}'?`)) {
      blogService
          .deleteBlog(id)
          .then(()=>{
              setBlogs(blogs.filter(a => a.id !== id))
          })
  }
}
  const handleLogout = (event) => {
    window.localStorage.clear()
    setUser(null)
  }

  const Button = ({ onClick, text}) => (
    <button onClick={onClick} >
        {text}
    </button>
  )
  if (user === null) {
  return (
    <div>
      <h1>Login to application</h1>
      <Warning message={errorMessage} />
      {loginForm()}
    </div>

  )
  }
  else return(
    
    <div>
      <h1>Blogs</h1>
      <Notification message={msg} />
      
      {newBlogForm()}
      <p>{user.name} logged-in <Button text="logout" onClick={(event)=>handleLogout(event)} /></p>
      {listblogs()}
    </div>
  )
}

export default App