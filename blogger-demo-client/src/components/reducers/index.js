import { combineReducers } from "redux";
import errorsReducer from "./errorsReducer";
import usersReducer from "./usersReducer";
import blogsReducer from "./blogsReducer";

export default combineReducers({
  errorsReducer: errorsReducer,
  usersReducer,
  blogsReducer
})