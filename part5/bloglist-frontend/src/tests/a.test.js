import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from "../components/Blog";

const user = {
    id:'621e4d2ad2387d6e914d0b4b',
    username: 'test',
    name:'test',
    password:'test',
    token: 'token',
}

const blog = {
    title: 'title',
    author: 'author',
    url: 'www.example.com',
    likes: 2,
    userId:'621e4d2ad2387d6e914d0b4b'
}
const blogs=[blog]

test('render test', ()=>{
    const component = render(
        blogs.map(blog =><Blog key={1} blog={blog} update={()=>{}} del={()=>{}}/>)
    )
    const div = component.container.querySelector('.test')
    expect(div).toHaveTextContent(blog.title)
    expect(div).toHaveTextContent(blog.author)
}) 
