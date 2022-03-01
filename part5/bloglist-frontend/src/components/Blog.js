import React,{useState} from 'react'

const Expand = ({blog, handleLike,handleDel}) => (
    <div>
        {blog.url}
      <br/>
        likes {blog.likes} 
        <button onClick={()=>handleLike(blog.id)}>
        like
    </button>
        <br/>
        {blog.user.username ? blog.user.username: null}<br/>
        <button onClick={()=>handleDel(blog.id)}>
        remove
    </button>
    </div>
)

const Blog = ({ blog, update, del }) => {
    const [show, setShow] = useState(false)
    const handleClick = () =>{
        setShow(!show)
    }
    
    const handleLike= (id) =>{
      update(id, blog)
    }
  const handleDel=(id)=>{
    del(id)
  }
    return (
        <div>
            {blog.title}, {blog.author}
            <button onClick={handleClick} >
            show
            </button>
            <div>
                {show ? <Expand blog={blog} handleLike={handleLike} handleDel={handleDel}/> : null}
            </div>
        </div>
    )
}

export default Blog