import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';


const BlogForm = ({ addBlog, setErrors, users }) => {

  const intialState = {
    title: "",
    content: "",
    user_id: ""
  }
  const [ formData, setFormData ] = useState(intialState);

  const navigate = useNavigate();

  useEffect(() => {
    // code here is what happens on mount
    if(users.length > 0) {
      setFormData({
        ...formData,
        user_id: users[0]?.id
      })
    }

    return () => {
      // code here is what happens when the component is unmounting
      setErrors([])
    }
  }, [users])

  const handleChange = e => {
    const { name, value } = e.target;
    console.log(value)
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

  const selectOptions = users.map(user => <option key={user.id} value={ user.id }>{ user.username }</option>)

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
          <label htmlFor="user_id">Select User: </label>
          <select id="user_id" name="user_id" value={ formData.user_id } onChange={ handleChange }>
            {selectOptions}
          </select>
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