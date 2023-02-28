import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const intialState = {
  title: "",
  content: ""
}

const BlogEdit = ({ editBlog, blogs, loading, loggedIn, currentUser }) => {
  const [ formData, setFormData ] = useState(intialState);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if(!loading && !loggedIn) {
      navigate('/login')
    }

    if(blogs.length > 0) {
      const blog = blogs.find(blog => blog.id === parseInt(id, 10))

      // find a blog
      console.log('loading', loading)
      console.log('currentuser', currentUser)
      console.log('blog', blog)
      console.log('blog user id', blog.user.id)
      if(!loading && currentUser.id !== blog.user.id) {
        navigate('/')
      }
      console.log('blog', blog)
      setFormData({
        title: blog.title,
        content: blog.content
      })
    }
  }, [blogs, loading, loggedIn, currentUser])

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = e => {
    e.preventDefault();

    fetch(`/blogs/${id}`, {
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