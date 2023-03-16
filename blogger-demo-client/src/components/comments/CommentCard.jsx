import React from 'react'

const CommentCard = ({ comment }) => {
  return (
    <div>
      <p>By: { comment.user.username }</p>
      <p>{ comment.content }</p>
    </div>
  )
}

export default CommentCard