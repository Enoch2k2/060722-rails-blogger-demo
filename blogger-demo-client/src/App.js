import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './components/auth/Login';
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
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    fetch('/get-current-user')
      .then(resp => resp.json())
      .then(data => {
        if(!data.message) {
          loginUser(data)
        }
      })

    fetch('/blogs')
      .then(resp => resp.json())
      .then(data => {
        setBlogs(data)
        fetch("/users")
          .then(resp => resp.json())
          .then(data => setUsers(data))
      })
  }, [])

  const loginUser = user => {
    setCurrentUser(user);
    setLoggedIn(true)
  }

  const logoutUser = () => {
    setCurrentUser(null);
    setLoggedIn(false)
  }

  console.log('currentUser', currentUser);

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
      <Navbar loggedIn={ loggedIn } logoutUser={ logoutUser } />
      <Errors errors={ errors } />
      <Routes>
        <Route path="/" element={ <Home />} />
        <Route path="/users" element={ <UserList users={ users } /> } />
        <Route path="/users/:user_id/blogs" element={ <UserBlogDetails deleteBlog={ deleteBlog } /> } />
        <Route path="/blogs" element={ <BlogList deleteBlog={ deleteBlog } blogs={ blogs } />} />
        <Route path="/blogs/new" element={ <BlogForm users={ users } addBlog={ addBlog } setErrors={ setErrors } />} />
        <Route path="/blogs/:id/edit" element={ <BlogEdit editBlog={ editBlog } blogs={ blogs }/>} />
        <Route path="/signup" element={ <Signup setErrors={ setErrors } addUser={ addUser } loginUser={loginUser} /> } />
        <Route path="/login" element={ <Login setErrors={ setErrors } loginUser={loginUser} /> } />
      </Routes>
    </Router>
  );
}

export default App;
