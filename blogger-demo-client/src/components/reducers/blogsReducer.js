import { updateResource, addResource, updateResourceCollection } from "../../Globals";

const blogsReducer = (state=[], action) => {
  // the action is an object that has these key values applied, action.type, action.payload

  switch(action.type) {
    case "LOAD_BLOGS":
      // return new non destructive state
      return action.payload
    case "DELETE_BLOG":
      return state.filter(blog => blog.id !== action.payload);
    case "EDIT_BLOG":
      return updateResource(state, action.payload);
    case "ADD_BLOG":
      return addResource(state, action.payload)
    case "ADD_BLOG_COMMENT":
      const blog = state.find(b => b.id === action.payload.blog_id);
      const updatedComments = addResource(blog.comments, action.payload)
      const updatedBlog = updateResourceCollection(blog, "comments", updatedComments)
      return updateResource(state, updatedBlog);

    default:
      return state;
  }

}

export default blogsReducer;