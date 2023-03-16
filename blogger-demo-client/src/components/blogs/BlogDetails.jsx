import React, { useContext } from 'react'
import { useParams } from 'react-router-dom';
import { BlogContext } from '../../context/BlogContext'
import CommentCard from '../comments/CommentCard';

const BlogDetails = () => {
  const { blogs } = useContext(BlogContext);
  const id  = parseInt(useParams().id);
  
  const blog = blogs.find(blog => blog.id === id);

  const comments = blog.comments.map(comment => <CommentCard key={ comment.id } comment={ comment } />)

  return (
    <div>
      <h1>{ blog.title }</h1>
      <p>by: { blog.author.username }</p>
      <p># of comments: { blog.comments.length }</p>
      <p>---</p>
      <p>{ blog.content }</p>
      <p>---</p>
      <h3>Comments:</h3>
      { comments }
    </div>
  )
}

export default BlogDetails