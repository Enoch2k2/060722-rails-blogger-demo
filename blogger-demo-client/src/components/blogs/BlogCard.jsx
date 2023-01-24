import React from 'react'

const BlogCard = ({ blog }) => {
  return (
    <div>
      <hr />
      <h4>{ blog.title }</h4>
      <p>By: { blog.user }</p>
      <p>{ blog.content }</p>
    </div>
  )
}

export default BlogCard