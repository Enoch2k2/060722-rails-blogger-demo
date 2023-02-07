import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import BlogEdit from './components/blogs/BlogEdit';
import BlogForm from './components/blogs/BlogForm';
import BlogList from './components/blogs/BlogList';
import Errors from './components/errors/Errors';
import Navbar from './components/navigation/Navbar';
import Home from './components/static/Home';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/blogs')
      .then(resp => resp.json())
      .then(data => setBlogs(data))
  }, [])

  const addBlog = blog => {
    setBlogs([...blogs, blog]);
  }

  const editBlog = newBlog => {
    const updatedBlogs = blogs.map(blog => {
      if(newBlog.id === blog.id) {
        return newBlog;
      } else {
        return blog;
      }
    })
    setBlogs(updatedBlogs);
  }

  const deleteBlog = deletedBlog => {
    const updatedBlogs = blogs.filter(blog => blog.id !== deletedBlog.id)
    setBlogs(updatedBlogs)
  }

  return (
    <Router>
      <Navbar />
      <Errors errors={ errors } />
      <Routes>
        <Route path="/" element={ <Home />} />
        <Route path="/blogs" element={ <BlogList deleteBlog={ deleteBlog } blogs={ blogs } />} />
        <Route path="/blogs/new" element={ <BlogForm addBlog={ addBlog } setErrors={ setErrors } />} />
        <Route path="/blogs/:id/edit" element={ <BlogEdit editBlog={ editBlog } blogs={ blogs }/>} />
      </Routes>
    </Router>
  );
}

export default App;
