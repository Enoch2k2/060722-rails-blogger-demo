import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const intialState = {
  title: "",
  content: "",
  user: ""
}

const BlogForm = ({ addBlog, setErrors }) => {
  const [ formData, setFormData ] = useState(intialState);

  const navigate = useNavigate();

  useEffect(() => {
    // code here is what happens on mount

    return () => {
      // code here is what happens when the component is unmounting
      setErrors([])
    }
  }, [])

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = e => {
    e.preventDefault();

    fetch('http://localhost:3001/blogs', {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
      .then(resp => resp.json())
      .then(data => {
        if(data.errors) {
          setErrors(data.errors)
        } else {
          addBlog(data)
          navigate('/blogs');
        }
      });
  }

  return (
    <div>
      <h3>Create Blog</h3>

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

        <input type="submit" value="Create Blog" />
      </form>
    </div>
  )
}

export default BlogForm