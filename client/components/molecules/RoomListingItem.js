import React from 'react'

import Image from '../atoms/Image'
import style from './styles/Room.css'

const RoomListingItem = ({
  room,
}) => (
  <div className={style.roomListingItem}>
    <div className={style.imageWrapper}>
      <Image src={room.photo_url[0]} alt={room.title} />
    </div>
    <h3 className={style.title}>{room.title}</h3>
    <p className={style.description}>{room.description}</p>
  </div>
)

export default RoomListingItem
