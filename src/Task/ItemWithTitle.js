import React from 'react'

const ItemWithTitle = ({
  title,
  children
}) => {
  return (
    <div className="d-flex flex-column">
      <span className="input-title mb-1">
        {title}
      </span>
      {children}
    </div>
  )
}

export default ItemWithTitle