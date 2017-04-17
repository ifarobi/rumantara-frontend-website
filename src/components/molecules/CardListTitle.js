import React from 'react'

import style from './styles/CardListTitle.css'

const CardListTitle = ({
  text,
}) => (
  <div className={style.cardListTitleContainer}>
    <h2>{text}</h2>
    <hr />
  </div>
)

export default CardListTitle
