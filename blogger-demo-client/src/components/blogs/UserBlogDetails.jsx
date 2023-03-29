import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { UserContext } from '../../context/UserContext';
import BlogCard from './BlogCard';
// /users/2/blogs

 const UserBlogDetails = () => {
  const [user, setUser] = useState({});
  const { user_id } = useParams(); // /users/:user_id/blogs

  const { currentUser, users } = useContext(UserContext);

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