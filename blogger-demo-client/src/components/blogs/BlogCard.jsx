import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/UserContext';
import { useDispatch } from 'react-redux';
import { deleteBlog } from '../actions/blogs';

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);

  const dispatch = useDispatch()
  
  const handleDelete = () => {
    dispatch(deleteBlog(blog.id))
  }

  return (
    <div>
      <hr />
      <h4><Link to={`/blogs/${ blog.id }`}>{ blog.title }</Link></h4>
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