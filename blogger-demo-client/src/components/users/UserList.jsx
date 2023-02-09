import React from 'react'
import { Link } from 'react-router-dom'

const UserList = ({ users }) => {

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