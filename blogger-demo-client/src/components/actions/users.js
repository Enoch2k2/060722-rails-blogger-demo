import { setErrors, clearErrors } from "./errors";
import { headers } from "../../Globals";

export const loadUsers = (setLoading) => {
  return dispatch => {
    fetch("/users")
    .then(resp => resp.json())
    .then(data => {
      const action = {
        type: "LOAD_USERS",
        payload: data
      }
      // setUsers(data)
      setLoading(false)
      dispatch(action);
    })
  }
}

export const loadCurrentUser = (setLoading) => {
  return dispatch => {
    fetch('/get-current-user')
      .then(resp => resp.json())
      .then(data => {
        if(!data.errors) {
          // dispatch an action that updates the store with the currentUser and logs us in
          // loginUser(data)
          const action = {
            type: "LOGIN_USER",
            payload: data
          }
          dispatch(action);
        } else {
          setLoading(false);
        }
      })
  }
}

export const loginUser = (user, navigate) => {
  return dispatch => {
    fetch("/login", {
      method: "POST",
      headers,
      body: JSON.stringify(user)
    })
      .then(resp => resp.json())
      .then(data => {
        if(data.errors) {
          dispatch(setErrors(data.errors));
        } else {
          const action = {
            type: "LOGIN_USER",
            payload: data
          }
          dispatch(action)
          dispatch(clearErrors())
          navigate("/blogs")
        }
      })
  }
}

export const signupUser = (user, navigate) => {
  return dispatch => {
    fetch("/signup", {
      method: "POST",
      headers,
      body: JSON.stringify(user)
    })
      .then(resp => resp.json())
      .then(data => {
        if(data.errors) {
          dispatch(setErrors(data.errors));
        } else {
          dispatch({
            type: "LOGIN_USER",
            payload: data
          })
          dispatch({
            type: "ADD_USER",
            payload: data
          })
          navigate("/blogs")
        }
      })
  }
}

export const logoutUser = () => {
  // not using thunk because of no fetch in this action
  return {
    type: "LOGOUT_USER"
  }
}