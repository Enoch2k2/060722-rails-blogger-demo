import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'


const UserList = ({ users, loggedIn, loading }) => {
  const navigate = useNavigate();

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