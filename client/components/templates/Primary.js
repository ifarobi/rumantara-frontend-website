import React from 'react'

import Header from '../organisms/Header'

const Primary = ({ children }) => (
  <div className="primary-layout">
    <Header />
    {children}
  </div>
)

export default Primary
