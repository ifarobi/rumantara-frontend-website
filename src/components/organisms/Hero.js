import React from 'react'
import classnames from 'classnames'

import style from './styles/Hero.css'

const Hero = ({ children, className, backgroundImage }) => {
  const cName = (typeof className !== 'undefined') ? classnames(style.heroContainer, className) : classnames(style.heroContainer)
  return (
    <div
      className={cName}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {children}
    </div>
  )
}

Hero.propTypes = {
  backgroundImage: React.PropTypes.string.isRequired,
}

export default Hero
