import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import BlogForm from './components/blogs/BlogForm';
import BlogList from './components/blogs/BlogList';
import Navbar from './components/navigation/Navbar';
import Home from './components/static/Home';

const App = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/blogs')
      .then(resp => resp.json())
      .then(data => setBlogs(data))
  }, [])

  const addBlog = blog => {
    setBlogs([...blogs, blog]);
  }

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={ <Home />} />
        <Route path="/blogs" element={ <BlogList blogs={ blogs } />} />
        <Route path="/blogs/new" element={ <BlogForm addBlog={ addBlog }/>} />
      </Routes>
    </Router>
  );
}

export default App;
