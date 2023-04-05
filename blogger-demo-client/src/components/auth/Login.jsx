import React, { useState, useEffect } from 'react'
import { headers } from '../../Globals';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setErrors, clearErrors } from '../actions/errors';
import { loginUser } from '../actions/users';

const Login = ({ loading }) => {
  const { loggedIn } = useSelector(store => store.usersReducer);
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  console.log('inside of the login component', loggedIn);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // code here is what happens on mount

    if(!loading && loggedIn) {
      navigate('/')
    }
    return () => {
      // code here is what happens when the component is unmounting
      dispatch(clearErrors())
      // dispatch({ type: "CLEAR_ERRORS" }) send it to the reducer
    }
  }, [loading, loggedIn, navigate, dispatch])

  const handleSubmit = e => {
    e.preventDefault();
    const user = { username, password }

    dispatch(loginUser(user, navigate))
  }

  return (
    <form onSubmit={ handleSubmit }>
      <h1>Login</h1>

      <div>
        <label htmlFor="username">Username: </label>
        <input 
          type="text" 
          name="username" 
          id="username"
          value={ username }
          onChange={ e => setUsername(e.target.value) }
          required={true}
         />
      </div>
      <div>
        <label htmlFor="password">Password: </label>
        <input 
          type="password"
          name="password" 
          id="password"
          value={ password }
          onChange={ e => setPassword(e.target.value) }
          required={true}
         />
      </div>

      <input type="submit" value="Login" />
    </form>
  )
}

export default Login