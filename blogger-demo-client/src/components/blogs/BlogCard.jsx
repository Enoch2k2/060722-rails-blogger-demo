import React from 'react'
import { useNavigate } from 'react-router-dom'

const BlogCard = ({ blog, deleteBlog }) => {
  const navigate = useNavigate();

  const handleDelete = () => {
    fetch(`http://localhost:3001/blogs/${ blog.id }`, {
      method: "DELETE",
      headers: {
        "Accept": "application/json"
      }
    })
      .then(resp => resp.json())
      .then(data => deleteBlog(data))
  }

  return (
    <div>
      <hr />
      <h4>{ blog.title }</h4>
      <p>By: { blog.user?.username }</p>
      <p>{ blog.content }</p>
      <button onClick={() => navigate(`/blogs/${ blog.id }/edit`)}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  )
}

export default BlogCard