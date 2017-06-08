import React, { Component } from 'react'
import { Card, CardMedia, CardTitle, CardActions } from 'react-toolbox/lib/card'
import Button from 'react-toolbox/lib/button'
import { Link } from 'react-router'

import Image from '../atoms/Image'
import style from './styles/Room.css'

class RoomListingItem extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    console.log(nextProps)
    if (this.props.room.id !== nextProps.room.id) {
      return true
    }
    return false
  }
  render() {
    const { room, onDeleteClick } = this.props
    return (
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
              <Link to={`/dashboard/rooms/edit/${room.id}`}>
                <Button label="Edit" icon="border_color" />
              </Link>
              <Button
                icon="delete"
                label="Delete"
                onClick={() => {
                  onDeleteClick(room)
                }}
              />
            </div>
          </CardActions>
        </div>
      </Card>
    )
  }
}

export default RoomListingItem
