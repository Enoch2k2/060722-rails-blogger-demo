import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/UserContext';


const UserList = ({ loading }) => {
  const navigate = useNavigate();
  const { users, loggedIn } = useContext(UserContext);
  
  useEffect(() => {
    if(!loading && !loggedIn) {
      navigate('/login')
    }
  }, [loading, loggedIn])
  
  const userLinks = users.map(user => <li key={ user.id }><Link to={`/users/${ user.id }/blogs`}>{ user.username }</Link></li>)

  return (
    <div>
    <h1>User List</h1>
    <ul>
      { userLinks }
    </ul>
    </div>
  )
}

export default UserList