import React from 'react'

import { Link } from 'react-router'

import classnames from 'classnames'

const Anchor = ({
  to,
  children,
  className,
  ...other
}) => {
  const cName = (typeof className !== 'undefined') ? classnames('anchor', className) : classnames('default-anchor')
  return (
    <Link to={to} className={cName} {...other}>
      {children}
    </Link>
  )
}

Anchor.propTypes = {
  to: React.PropTypes.string.isRequired,
}

export default Anchor
