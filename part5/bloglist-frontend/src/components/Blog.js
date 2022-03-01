import React,{useState} from 'react'

const Expand = ({blog, handleLike}) => (
    <div>
        {blog.url}
      <br/>
        likes {blog.likes} 
        <button onClick={()=>handleLike(blog.id)}>
        like
    </button>
        <br/>
        {blog.user.username ? blog.user.username: null}<br/>
    </div>
)

const Blog = ({ blog, update }) => {
    const [show, setShow] = useState(false)
    const handleClick = () =>{
        setShow(!show)
    }
    
    const handleLike= (id) =>{
      update(id, blog)
  }
    return (
        <div>
            {blog.title}, {blog.author}
            <button onClick={handleClick} >
            show
            </button>
            <div>
                {show ? <Expand blog={blog} handleLike={handleLike}/> : null}
            </div>
        </div>
    )
}

export default Blog