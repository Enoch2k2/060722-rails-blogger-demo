import React, { useState } from 'react'
import { addComment } from '../actions/blogs';
import { useDispatch } from 'react-redux';

const CommentForm = ({ blog_id }) => {
  const [content, setContent] = useState("")
  const [errors, setErrors] = useState([])

  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();

    dispatch(addComment(content, blog_id, setErrors))

    setContent("") // reset our input
  }

  const errorLis = errors.map((err, idx) => <li key={idx}>{ err }</li>)

  return (
    <div>
      <h3>Create a comment</h3>
      <form onSubmit={ handleSubmit }>
        <div>
          <label htmlFor="content">Content: </label><br />
          <textarea name="content" id="content" cols="45" rows="10" value={ content } onChange={ e => setContent(e.target.value) }></textarea>
        </div>

        <input type="submit" value="Create Comment" />
      </form>
      <ul>
        { errorLis }
      </ul>
    </div>
  )
}

export default CommentForm