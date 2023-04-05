import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import BlogCard from './BlogCard';
import { useSelector } from 'react-redux';
// /users/2/blogs

 const UserBlogDetails = () => {
  const [user, setUser] = useState({});
  const { user_id } = useParams(); // /users/:user_id/blogs

  const { currentUser, users } = useSelector(store => store.usersReducer);

  useEffect(() => {
    const usr = users.find(u => u.id === parseInt(user_id))

    setUser(usr);
  }, [users, user_id])
  
  const blogCards = user.blogs?.map(blog => <BlogCard key={ blog.id } blog={ blog } currentUser={ currentUser }/>)

  return (
    <div>
      <h1>User Details Page</h1>
      { blogCards }
    </div>
  )
}

export default UserBlogDetails