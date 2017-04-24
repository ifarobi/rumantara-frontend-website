import React from 'react'

import { Card, CardMedia, CardTitle, CardActions } from 'react-toolbox/lib/card'
import { Button } from 'react-toolbox/lib/button'
import FontIcon from 'react-toolbox/lib/font_icon'
import { Link } from 'react-router'

import style from './styles/RoomCard.css'

const RoomCard = ({
  id,
  image,
  title,
  price,
}) => (
  <Card theme={style}>
    <Link to={`/room/${id}`}>
      <CardMedia
        aspectRatio="wide"
        image={image}
      >
        <CardTitle
          theme={style}
          title={title}
        >
          <span className={style.price}>{price}</span>
          <div className={style.rate}>
            <FontIcon value="star_half" />
            <span>4.5</span>
          </div>
        </CardTitle>
      </CardMedia>
    </Link>
    <CardActions theme={style}>
      <div className="flex-self-start">
        <Button href="#" icon="favorite_border" />
        <Button href="#" icon="share" />
      </div>
      <div className="flex-self-end">
        <Link to={`/room/${id}`}>
          <Button label="Detail" icon="search" />
        </Link>
        <Button href="#" icon="add" label="Order" />
      </div>
    </CardActions>
  </Card>
)

export default RoomCard
