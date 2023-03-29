const blogsReducer = (state=[], action) => {
  // the action is an object that has these key values applied, action.type, action.payload

  switch(action.type) {
    case "LOAD_BLOGS":
      // return new non destructive state
      return action.payload
    case "DELETE_BLOG":
      return state.filter(blog => blog.id !== action.payload);
    case "EDIT_BLOG":
      return state.map(blog => {
        if(action.payload.id === blog.id) {
          return action.payload;
        } else {
          return blog;
        }
      })   
    case "ADD_BLOG":
      return [...state, action.payload]
    case "ADD_BLOG_COMMENT":
      const blog = state.find(b => b.id === action.payload.blog_id);
      const updatedComments = [...blog.comments, action.payload];
      const updatedBlog = { ...blog, comments: updatedComments };

      return state.map(b => {
        if(b.id === blog.id) {
          return updatedBlog;
        } else {
          return b;
        }
      });

    default:
      return state;
  }

}

export default blogsReducer;