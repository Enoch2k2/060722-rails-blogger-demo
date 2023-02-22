import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import BlogCard from './BlogCard';
// /users/2/blogs

 const UserBlogDetails = ({ deleteBlog }) => {
  const [userBlogs, setUserBlogs] = useState([]);
  const { user_id } = useParams(); // /users/:user_id/blogs

  useEffect(() => {
    fetch("/users/" + user_id + "/blogs")
      .then(resp => resp.json())
      .then(data => setUserBlogs(data))
  }, [user_id])

  const blogCards = userBlogs.map(blog => <BlogCard key={ blog.id } blog={ blog } deleteBlog={ deleteBlog } />)

  return (
    <div>
      <h1>User Details Page</h1>
      { blogCards }
    </div>
  )
}

export default UserBlogDetails