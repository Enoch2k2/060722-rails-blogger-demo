import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { BlogContext } from '../../context/BlogContext';
import { UserContext } from '../../context/UserContext';

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const { deleteBlog } = useContext(BlogContext);
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
    <p>By: { blog.author?.username }</p>
      <p>{ blog.content }</p>
      {currentUser && currentUser.id === blog.author.id ? <>
        <button onClick={() => navigate(`/blogs/${ blog.id }/edit`)}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </> : null}
    </div>
  )
}

export default BlogCard