import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { addBlog } from '../actions/blogs';
import { useDispatch } from 'react-redux';
import { clearErrors } from '../actions/errors';


const BlogForm = ({ loading }) => {
  
  const intialState = {
    title: "",
    content: ""
  }

  const { loggedIn } = useContext(UserContext);
  const [ formData, setFormData ] = useState(intialState);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if(!loading && !loggedIn) {
      navigate('/login')
    }

    return () => {
      // code here is what happens when the component is unmounting
      dispatch(clearErrors())
    }
  }, [loading, loggedIn, navigate, dispatch])

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

    dispatch(addBlog(formData, navigate))
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