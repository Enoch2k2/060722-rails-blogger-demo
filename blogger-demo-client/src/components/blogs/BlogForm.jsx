import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { BlogContext } from '../../context/BlogContext';
import { ErrorsContext } from '../../context/ErrorsContext';
import { UserContext } from '../../context/UserContext';


const BlogForm = ({ loading }) => {
  
  const intialState = {
    title: "",
    content: ""
  }
  
  const { setErrors } = useContext(ErrorsContext);
  const { loggedIn } = useContext(UserContext);
  const { addBlog } = useContext(BlogContext)
  const [ formData, setFormData ] = useState(intialState);

  const navigate = useNavigate();

  useEffect(() => {

    if(!loading && !loggedIn) {
      navigate('/login')
    }

    return () => {
      // code here is what happens when the component is unmounting
      setErrors([])
    }
  }, [loading, loggedIn, navigate, setErrors])

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

    fetch('/blogs', {
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
          <label htmlFor="content">Content</label>
          <textarea
            type="text"
            name="content"
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