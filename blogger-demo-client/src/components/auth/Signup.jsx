import React, { useState, useEffect } from 'react'
import { headers } from '../../Globals';
import { useNavigate } from 'react-router-dom';

const Signup = ({ setErrors, addUser, loginUser, loading, loggedIn }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate();

  useEffect(() => {
    // code here is what happens on mount
    if(!loading && loggedIn) {
      navigate("/")
    }
    

    return () => {
      // code here is what happens when the component is unmounting
      setErrors([])
    }
  }, [loading, loggedIn])

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
          setErrors(data.errors);
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