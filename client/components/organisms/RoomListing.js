import React, { Component } from 'react'
import { v4 } from 'uuid'

import RoomListingItem from '../molecules/RoomListingItem'
import style from './styles/Room.css'

class RoomListing extends Component {
  constructor(props) {
    super(props)
    this.renderItems = this.renderItems.bind(this)
  }
  renderItems() {
    const { rooms } = this.props
    if (rooms.length > 0) {
      return rooms.map(r => <RoomListingItem key={v4()} room={r} />)
    }
    return (
      <h2 className="text-center">You dont have any rooms</h2>
    )
  }
  render() {
    return (
      <div className={style.roomListingWrapper}>
        {this.renderItems()}
      </div>
    )
  }
}

export default RoomListing
