import React, {useState} from 'react';

const NewBlogForm = ({createBlog}) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const setBlog = async (event) => {
        event.preventDefault()
        setTitle('')
        setAuthor('')
        setUrl('')
        createBlog({
            title: title,
            author: author,
            url: url,
            likes:0
        })
    }
    return (
        <div>
            <h2>create new blogs</h2>
            <form onSubmit={setBlog}>
                <div>
                    title:
                    <input
                        type='text'
                        value={title}
                        name='Title'
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>
                    author:
                    <input
                        type='text'
                        value={author}
                        name='Author'
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>
                <div>
                    url:
                    <input
                        type='text'
                        value={url}
                        name='Url'
                        onChange={({ target }) => setUrl(target.value)}
                    />
                </div>
                <button type='submit'>Create</button>
            </form>
        </div>
    )
}
export default NewBlogForm 