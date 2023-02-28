import BlogCard from "./BlogCard"
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const BlogList = ({ blogs, deleteBlog, loggedIn, loading }) => {

  const navigate = useNavigate();

  useEffect(() => {
    console.log('loading', loading);
    console.log('loggedIn', loggedIn);
    if(!loading && !loggedIn) {
      navigate('/login')
    }
  }, [loading, loggedIn])

  const blogCards = blogs.map((blog, idx) => <BlogCard key={ idx } blog={ blog } deleteBlog={ deleteBlog } />)
  return (
    <div>
      <h3>Blogs</h3>
      { blogCards }
    </div>
  )
}

export default BlogList