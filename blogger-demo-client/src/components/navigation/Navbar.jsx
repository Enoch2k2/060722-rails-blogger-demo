import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../actions/users';

const Navbar = () => {
  const { loggedIn, currentUser } = useSelector(store => store.usersReducer );
  const dispatch = useDispatch();

  const handleLogout = () => {
    fetch('/logout', { method: "DELETE" })
    dispatch(logoutUser());
  }

  const loggedInLinks = () => {
    return (
      <>
        <li>{ currentUser.username }</li>
        <li><Link to="/users">User List</Link></li>
        <li><Link to="/blogs">Blogs</Link></li>
        <li><Link to="/blogs/new">Create Blog</Link></li>
        <li><Link to="#" onClick={ handleLogout }>Logout</Link></li>
      </>
    )
  }

  const loggedOutLinks = () => {
    return (
      <>
        <li><Link to="/signup">Signup</Link></li>
        <li><Link to="/login">Login</Link></li>
        
      </>
    )
  }

  return (
    <ul>
      <li><Link to="/">Home</Link></li>
      { loggedIn ? loggedInLinks() : loggedOutLinks() }
    </ul>
  )
}

export default Navbar