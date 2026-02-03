import React from 'react'

const InputElement = ({title, children}) => {
  return (
    <div className="input-card">
        <p>{title}</p>
        {children}
    </div>
  )
}

export default InputElement