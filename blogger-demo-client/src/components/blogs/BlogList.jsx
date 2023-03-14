import BlogCard from "./BlogCard"
import { useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { BlogContext } from "../../context/BlogContext";

const BlogList = ({ loading }) => {

  const navigate = useNavigate();
  const { loggedIn } = useContext(UserContext)
  const { blogs, deleteBlog } = useContext(BlogContext);

  useEffect(() => {
    if(!loading && !loggedIn) {
      navigate('/login')
    }
  }, [loading, loggedIn, navigate])

  const blogCards = blogs.map((blog, idx) => <BlogCard key={ idx } blog={ blog } deleteBlog={ deleteBlog } />)
  return (
    <div>
      <h3>Blogs</h3>
      { blogCards }
    </div>
  )
}

export default BlogList