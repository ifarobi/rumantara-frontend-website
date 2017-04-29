import React from 'react'

import classnames from 'classnames'
import style from './styles/SectionTitle.css'

const SectionTitle = ({
  label,
  className,
  textAlign,
}) => {
  const componentClass = classnames(
    typeof className !== 'undefined' ? className : '',
    style.sectionTitleContainer,
  )
  let styles = {}
  if (textAlign) {
    styles = Object.assign(styles, { textAlign })
  }
  return (
    <div style={styles} className={componentClass}>
      <h2>{label}</h2>
      <hr />
    </div>
  )
}

export default SectionTitle
