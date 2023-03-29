import { useParams } from 'react-router-dom';
import CommentCard from '../comments/CommentCard';
import CommentForm from '../comments/CommentForm';
import { useSelector } from 'react-redux';

const BlogDetails = () => {
  const blogs = useSelector(state => state.blogsReducer);
  const id  = parseInt(useParams().id);
  
  const blog = blogs.find(blog => blog.id === id);

  const comments = blog.comments?.map(comment => <CommentCard key={ comment.id } comment={ comment } />)

  return (
    <div>
      <h1>{ blog.title }</h1>
      <p>by: { blog.author.username }</p>
      <hr/>
      <p>{ blog.content }</p>
      <hr/>
      <CommentForm blog_id={ blog.id } />
      <h3>Comments:</h3>
      { comments }
    </div>
  )
}

export default BlogDetails