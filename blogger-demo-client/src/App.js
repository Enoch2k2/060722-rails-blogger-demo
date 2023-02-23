import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Signup from './components/auth/Signup';
import BlogEdit from './components/blogs/BlogEdit';
import BlogForm from './components/blogs/BlogForm';
import BlogList from './components/blogs/BlogList';
import UserBlogDetails from './components/blogs/UserBlogDetails';
import Errors from './components/errors/Errors';
import Navbar from './components/navigation/Navbar';
import Home from './components/static/Home';
import UserList from './components/users/UserList';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [errors, setErrors] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('/blogs')
      .then(resp => resp.json())
      .then(data => {
        setBlogs(data)
        fetch("/users")
          .then(resp => resp.json())
          .then(data => setUsers(data))
      })
  }, [])

  useEffect(() => {
    fetch('whats-the-cookies')
      .then(resp => resp.json())
      .then(data => console.log(data))
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

  const addUser = user => {
    setUsers([...users, user])
  }

  return (
    <Router>
      <Navbar />
      <Errors errors={ errors } />
      <Routes>
        <Route path="/" element={ <Home />} />
        <Route path="/users" element={ <UserList users={ users } /> } />
        <Route path="/users/:user_id/blogs" element={ <UserBlogDetails deleteBlog={ deleteBlog } /> } />
        <Route path="/blogs" element={ <BlogList deleteBlog={ deleteBlog } blogs={ blogs } />} />
        <Route path="/blogs/new" element={ <BlogForm users={ users } addBlog={ addBlog } setErrors={ setErrors } />} />
        <Route path="/blogs/:id/edit" element={ <BlogEdit editBlog={ editBlog } blogs={ blogs }/>} />
        <Route path="/signup" element={ <Signup setErrors={ setErrors } addUser={ addUser } /> } />
      </Routes>
    </Router>
  );
}

export default App;
