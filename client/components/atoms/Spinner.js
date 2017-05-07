import React from 'react'

const Spinner = ({
  size,
}) => (
  <div style={{ width: size.widht, height: size.height, position: 'relative' }}>
    <div className="spinner" />
  </div>
)

export default Spinner
