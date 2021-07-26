import React from 'react'
const Alert = ({ children }) => {
  return (
    <div
      className='bg-pink-200 border-l-4 border-pink-600 text-pink-900 p-3'
      role='alert'
    >
      {children}
    </div>
  )
}
export default Alert