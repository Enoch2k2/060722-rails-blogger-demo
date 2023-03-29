import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { useDispatch, useSelector } from 'react-redux';
import { editBlog } from '../actions/blogs';

const intialState = {
  title: "",
  content: ""
}

const BlogEdit = ({ loading }) => {
  const { loggedIn, currentUser } = useContext(UserContext);
  const blogs = useSelector(store => store.blogsReducer );
  const [ formData, setFormData ] = useState(intialState);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
      console.log('blog user id', blog.author.id)
      if(!loading && currentUser.id !== blog.author.id) {
        navigate('/')
      }
      console.log('blog', blog)
      setFormData({
        title: blog.title,
        content: blog.content
      })
    }
  }, [blogs, loading, loggedIn, currentUser, id, navigate])

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = e => {
    e.preventDefault();

    dispatch(editBlog(id, formData, navigate))
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