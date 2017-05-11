import React from 'react'
import classnames from 'classnames'

import style from './styles/Panel.css'

const Panel = ({
  className,
  children,
  title,
}) => {
  let header = null
  if (typeof title !== 'undefined') {
    header = <div className={style.panelHeader}>{title}</div>
  }
  const componentClass = typeof className !== 'undefined' ? classnames(className, style.panelContainer) : style.panelContainer
  return (
    <div className={componentClass}>
      {header}
      <div className={style.panelBody}>
        {children}
      </div>
    </div>
  )
}

export default Panel
