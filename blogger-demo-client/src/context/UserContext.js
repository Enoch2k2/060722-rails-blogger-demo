import { useState, createContext, useEffect } from "react";


const UserContext = createContext({});

const UserProvider = ({ children, setLoading }) => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    fetch('/get-current-user')
    .then(resp => resp.json())
    .then(data => {
      if(!data.errors) {
        loginUser(data)
      } else {
        setLoading(false);
      }
    })
  }, [])

  useEffect(() => {
    if(loggedIn) {
      fetch("/users")
      .then(resp => resp.json())
      .then(data => {
        setUsers(data)
        setLoading(false)
      })
    }
  }, [loggedIn])

  const loginUser = user => {
    setCurrentUser(user);
    setLoggedIn(true)
  }

  const logoutUser = () => {
    setCurrentUser(null);
    setLoggedIn(false)
  }

  const addUser = user => {
    setUsers([...users, user])
  }

  return <UserContext.Provider value={{ users, loggedIn, currentUser, addUser, loginUser, logoutUser }}>{ children }</UserContext.Provider>
}

export { UserContext, UserProvider }