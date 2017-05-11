import React from 'react'

import { Link } from 'react-router'

import classnames from 'classnames'

const Anchor = ({
  to,
  children,
  className,
  primary,
  ...other
}) => {
  let cName = (typeof className !== 'undefined') ? classnames('anchor', className) : 'default anchor'
  cName = (primary === true) ? classnames(cName, 'primary') : cName
  return (
    <Link to={to} className={cName} {...other}>
      {children}
    </Link>
  )
}

Anchor.propTypes = {
  to: React.PropTypes.string.isRequired,
}

Anchor.defaultProps = {
  primary: false,
}

export default Anchor
