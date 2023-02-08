import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/blogs">Blogs</Link></li>
      <li><Link to="/blogs/new">Create Blog</Link></li>
      <li><Link to="/signup">Signup</Link></li>
    </ul>
  )
}

export default Navbar