import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/blogs">Blogs</Link></li>
      <li><Link to="/blogs/new">Create Blog</Link></li>
    </ul>
  )
}

export default Navbar