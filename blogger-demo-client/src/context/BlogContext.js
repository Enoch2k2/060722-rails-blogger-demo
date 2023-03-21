import { createContext, useState, useEffect } from "react";

const BlogContext = createContext([]);

const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    fetch('/blogs')
      .then(resp => resp.json())
      .then(data => {
        setBlogs(data)
      })
  }, [])

  const addBlog = blog => {
    setBlogs([...blogs, blog]);
  }

  const editBlog = newBlog => {
    const updatedBlogs = blogs.map(blog => {
      if(newBlog.id === blog.id) {
        return newBlog;
      } else {
        return blog;
      }
    })
    setBlogs(updatedBlogs);
  }

  const deleteBlog = deletedBlog => {
    const updatedBlogs = blogs.filter(blog => blog.id !== deletedBlog.id)
    setBlogs(updatedBlogs)
  }

  const addComment = comment => { // comment = data
    // blogs arrays
    const blog = blogs.find(b => b.id === comment.blog_id);
    const updatedComments = [...blog.comments, comment];
    const updatedBlog = { ...blog, comments: updatedComments };

    const updatedBlogs = blogs.map(b => {
      if(b.id === blog.id) {
        return updatedBlog;
      } else {
        return b;
      }
    });
    // blog that contains comments
    // comments of a particular blog, needs to have this comment added to it
    setBlogs(updatedBlogs);
  }

  return <BlogContext.Provider value={{ blogs, addBlog, editBlog, deleteBlog, addComment }}>{ children }</BlogContext.Provider>
}

export { BlogContext, BlogProvider };