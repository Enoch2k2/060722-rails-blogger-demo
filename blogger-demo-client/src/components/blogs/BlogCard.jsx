import React from 'react'
import { useNavigate } from 'react-router-dom'

const BlogCard = ({ blog, deleteBlog, currentUser }) => {
  const navigate = useNavigate();

  const handleDelete = () => {
    fetch(`/blogs/${ blog.id }`, {
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
      {currentUser && currentUser.id === blog.user.id ? <>
        <button onClick={() => navigate(`/blogs/${ blog.id }/edit`)}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </> : null}
    </div>
  )
}

export default BlogCard