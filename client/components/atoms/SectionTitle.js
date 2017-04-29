import React from 'react'

import classnames from 'classnames'
import style from './styles/SectionTitle.css'

const SectionTitle = ({
  label,
  className,
}) => {
  const componentClass = classnames(
    typeof className !== 'undefined' ? className : '',
    style.sectionTitleContainer,
  )
  return (
    <div className={componentClass}>
      <h2>{label}</h2>
    </div>
  )
}

export default SectionTitle
