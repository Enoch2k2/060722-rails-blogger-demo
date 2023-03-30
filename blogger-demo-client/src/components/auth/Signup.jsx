import React, { useState, useEffect, useContext } from 'react'
import { headers } from '../../Globals';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { setErrors, clearErrors } from '../actions/errors';
import { useDispatch } from 'react-redux';

const Signup = ({ loading }) => {
  const { addUser, loginUser, loggedIn } = useContext(UserContext);
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

    fetch("/signup", {
      method: "POST",
      headers,
      body: JSON.stringify({ username, password })
    })
      .then(resp => resp.json())
      .then(data => {
        if(data.errors) {
          dispatch(setErrors(data.errors));
        } else {
          addUser(data)
          loginUser(data)
          navigate("/blogs")
        }
      })
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