import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import BlogDetails from './components/blogs/BlogDetails';
import BlogEdit from './components/blogs/BlogEdit';
import BlogForm from './components/blogs/BlogForm';
import BlogList from './components/blogs/BlogList';
import UserBlogDetails from './components/blogs/UserBlogDetails';
import Errors from './components/errors/Errors';
import Navbar from './components/navigation/Navbar';
import Home from './components/static/Home';
import UserList from './components/users/UserList';
import { BlogProvider } from './context/BlogContext';
import { ErrorsProvider } from './context/ErrorsContext';
import { UserProvider } from './context/UserContext';
import { useSelector } from 'react-redux';

const App = () => {
  const [loading, setLoading] = useState(true);
  const reduxState = useSelector((store) => store.blogsReducer );

  console.log(reduxState);
  return (
    <Router>
      <ErrorsProvider>
        <UserProvider setLoading={ setLoading }>
          <BlogProvider>
            <Navbar />
            <Errors />
            {
              loading ? <h1>Loading...</h1> : 
              <Routes>
              <Route path="/" element={ <Home />} />
              <Route path="/users" element={ <UserList /> } />
              <Route path="/users/:user_id/blogs" element={ <UserBlogDetails /> } />
              <Route path="/blogs" element={ <BlogList />} />
              <Route path="/blogs/new" element={ <BlogForm loading={ loading } />} />
              <Route path="/blogs/:id/edit" element={ <BlogEdit  loading={ loading } />} />
              <Route path="/blogs/:id" element={ <BlogDetails /> } />
              <Route path="/signup" element={ <Signup loading={ loading } /> }  />
              <Route path="/login" element={ <Login loading={ loading } /> } />
            </Routes>
            }
          </BlogProvider>
        </UserProvider>
      </ErrorsProvider>
    </Router>
  );
}

export default App;
