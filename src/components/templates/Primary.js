import React from 'react'

import HeaderPrimary from '../organisms/Header/Primary'

const Primary = ({ children }) => (
  <div>
    <HeaderPrimary />
    {children}
  </div>
)

export default Primary
