import React, { useState, useEffect } from 'react'
import { baseUrl, headers } from '../../Globals';

const Signup = ({ setErrors, addUser }) => {
  const [username, setUsername] = useState("")

  useEffect(() => {
    // code here is what happens on mount

    return () => {
      // code here is what happens when the component is unmounting
      setErrors([])
    }
  }, [])

  const handleSubmit = e => {
    e.preventDefault();

    fetch(baseUrl + "/signup", {
      method: "POST",
      headers,
      body: JSON.stringify({ username })
    })
      .then(resp => resp.json())
      .then(data => {
        if(data.errors) {
          setErrors(data.errors);
        } else {
          addUser(data)
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

      <input type="submit" value="Create Account" />
    </form>
  )
}

export default Signup