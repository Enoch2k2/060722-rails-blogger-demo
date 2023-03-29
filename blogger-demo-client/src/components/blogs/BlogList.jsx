import BlogCard from "./BlogCard"
import { useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { useSelector } from 'react-redux';

const BlogList = ({ loading }) => {

  const navigate = useNavigate();
  const { loggedIn } = useContext(UserContext)
  const blogs = useSelector(store => store.blogsReducer );

  useEffect(() => {
    if(!loading && !loggedIn) {
      navigate('/login')
    }
  }, [loading, loggedIn, navigate])

  const blogCards = blogs.map((blog, idx) => <BlogCard key={ idx } blog={ blog } />)
  return (
    <div>
      <h3>Blogs</h3>
      { blogCards }
    </div>
  )
}

export default BlogList