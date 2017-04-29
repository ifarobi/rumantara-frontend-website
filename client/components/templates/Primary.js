import React from 'react'

import Header from '../organisms/Header'
import Footer from '../organisms/Footer'

const Primary = ({ children }) => (
  <div className="primary-layout">
    <Header />
    {children}
    <Footer />
  </div>
)

export default Primary
