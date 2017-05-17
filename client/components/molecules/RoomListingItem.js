import React from 'react'
import { Card, CardMedia, CardTitle, CardActions } from 'react-toolbox/lib/card'
import Button from 'react-toolbox/lib/button'
import { Link } from 'react-router'

import Image from '../atoms/Image'
import style from './styles/Room.css'

const RoomListingItem = ({
  room,
}) => (
  <Card className={style.roomListingItem}>
    <div
      className={style.imageWrapper}
      style={{
        backgroundImage: `url(${room.room_pictures[0].url})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
      }}
    />
    <div className={style.listingOverview}>
      <CardTitle
        theme={style}
        title={room.name}
      />
      <p className={style.description}>{room.description}</p>
      <CardActions theme={style}>
        <div className="flex-self-end">
          <Link to={`/room/edit/${room.id}`}>
            <Button label="Edit" icon="border_color" />
          </Link>
          <Button href="#" icon="delete" label="Delete" />
        </div>
      </CardActions>
    </div>
  </Card>
)

export default RoomListingItem
