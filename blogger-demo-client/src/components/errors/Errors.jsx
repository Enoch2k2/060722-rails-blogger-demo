import React from 'react'

const Errors = ({ errors }) => {
  const errorLis = errors.map((error, idx) => <li key={ idx }>{ error }</li>)
  return (
    <ul>
      { errorLis }
    </ul>
  )
}

export default Errors