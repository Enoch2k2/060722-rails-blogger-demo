import React, { useState, useEffect, useContext } from 'react'
import { headers } from '../../Globals';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { ErrorsContext } from '../../context/ErrorsContext';

const Login = ({ loading }) => {
  const { setErrors } = useContext(ErrorsContext);
  const { loginUser, loggedIn } = useContext(UserContext);
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate();

  useEffect(() => {
    // code here is what happens on mount

    if(!loading && loggedIn) {
      navigate('/')
    }
    return () => {
      // code here is what happens when the component is unmounting
      setErrors([])
    }
  }, [loading, loggedIn, navigate, setErrors])

  const handleSubmit = e => {
    e.preventDefault();

    fetch("/login", {
      method: "POST",
      headers,
      body: JSON.stringify({ username, password })
    })
      .then(resp => resp.json())
      .then(data => {
        if(data.errors) {
          setErrors(data.errors);
        } else {
          loginUser(data)
          setErrors([])
          navigate("/blogs")
        }
      })
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