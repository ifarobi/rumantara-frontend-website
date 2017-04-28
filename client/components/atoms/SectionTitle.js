import React from 'react'

import style from './styles/SectionTitle.css'

const SectionTitle = ({
  label,
}) => (
  <div className={style.sectionTitleContainer}>
    <h2>{label}</h2>
  </div>
)

export default SectionTitle
