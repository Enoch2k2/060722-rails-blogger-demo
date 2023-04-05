import React, { useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { setErrors, clearErrors } from '../actions/errors';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser } from '../actions/users';

const Signup = ({ loading }) => {
  const { loggedIn } = useSelector(store => store.usersReducer );
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // code here is what happens on mount
    if(!loading && loggedIn) {
      navigate("/")
    }
    

    return () => {
      // code here is what happens when the component is unmounting
      dispatch(clearErrors())
    }
  }, [loading, loggedIn, navigate, dispatch])

  const handleSubmit = e => {
    e.preventDefault();
    const user = { username, password }
    dispatch(signupUser(user, navigate))
  }

  return (
    <form onSubmit={ handleSubmit }>
      <h1>Create Account</h1>

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

      <input type="submit" value="Create Account" />
    </form>
  )
}

export default Signup