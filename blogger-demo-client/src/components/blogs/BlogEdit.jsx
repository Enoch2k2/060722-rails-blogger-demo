import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const intialState = {
  title: "",
  content: "",
  user: ""
}

const BlogEdit = ({ editBlog, blogs }) => {
  const [ formData, setFormData ] = useState(intialState);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if(blogs.length > 0) {
      // find a blog
      const blog = blogs.find(blog => blog.id === parseInt(id, 10))
      console.log('blog', blog)
      setFormData({
        title: blog.title,
        content: blog.content,
        user: blog.user
      })
    }
  }, [blogs])

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = e => {
    e.preventDefault();

    fetch(`http://localhost:3001/blogs/${id}`, {
      method: "PATCH",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
      .then(resp => resp.json())
      .then(data => {
        editBlog(data)
        navigate('/blogs')
      })
  }

  return (
    <div>
      <h3>Edit Blog</h3>

      <form onSubmit={ handleSubmit }>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={ formData.title }
            onChange={ handleChange }
          />
        </div>
        <div>
          <label htmlFor="user">User</label>
          <input
            type="text"
            name="user"
            id="user"
            value={ formData.user }
            onChange={ handleChange }
          />
        </div>
        <div>
          <label htmlFor="content">Content</label>
          <textarea
            type="text"
            name="content"
            id="content"
            value={ formData.content }
            onChange={ handleChange }
          />
        </div>

        <input type="submit" value="Update Blog" />
      </form>
    </div>
  )
}

export default BlogEdit