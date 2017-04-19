import React from 'react'
import Primary from './components/templates/Primary'

const Root = ({ children }) => (
  <div className="rumantaraRoot">
    <Primary>
      {children}
    </Primary>
  </div>
)

export default Root
