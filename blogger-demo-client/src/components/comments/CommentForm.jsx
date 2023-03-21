import React, { useContext, useState } from 'react'
import { BlogContext } from '../../context/BlogContext';
import { ErrorsContext } from '../../context/ErrorsContext';
import { headers } from '../../Globals';

const CommentForm = ({ blog_id }) => {
  const [content, setContent] = useState("")
  const [errors, setErrors] = useState([])
  const { addComment } = useContext(BlogContext);

  const handleSubmit = e => {
    e.preventDefault();

    const options = {
      method: "POST",
      headers,
      body: JSON.stringify({ content, blog_id })
    }

    fetch("/comments", options)
      .then(resp => resp.json())
      .then(data => {
        // do stuff to make things viewable
        if(data.errors) {
          setErrors(data.errors);
        } else {
          addComment(data);
        }
      });

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