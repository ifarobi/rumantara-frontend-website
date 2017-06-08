import React, { Component } from 'react'
import { v4 } from 'uuid'
import axios from 'axios'
import config from 'config'
import { connect } from 'react-redux'
import Dialog from 'react-toolbox/lib/dialog'

import RoomListingItem from '../molecules/RoomListingItem'
import style from './styles/Room.css'

class RoomListing extends Component {
  constructor(props) {
    super(props)
    this.renderItems = this.renderItems.bind(this)
    this.state = {
      rooms: [],
      isLoaded: false,
      isDialogActive: false,
    }
    this.deleteId = null
    this.handleDelete = this.handleDelete.bind(this)
    this.handleToggleDialog = this.handleToggleDialog.bind(this)
  }
  componentWillMount() {
    const { userId, token } = this.props
    axios.get(`${config.API_URL}/rooms/get-by-user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      this.setState({ rooms: response.data, isLoaded: true })
    })
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.rooms.length !== nextState.rooms.length) {
      return true
    }
    if (this.state.isLoaded !== nextState.isLoaded) {
      return true
    }
    if (this.state.isDialogActive !== nextState.isDialogActive) {
      return true
    }
    return false
  }
  handleToggleDialog() {
    this.setState({ isDialogActive: !this.state.isDialogActive })
  }
  handleDelete() {
    const { rooms, isDialogActive } = this.state
    axios.delete(`${config.API_URL}/rooms/${this.deleteId}`, {
      headers: {
        Authorization: `Bearer ${this.props.token},`
      }
    })
   .then((response) => {
     console.log(response)
     const newList = rooms.filter(d => (d.id !== this.deleteId))
     this.setState({ rooms: newList, isDialogActive: !isDialogActive })
   })
  }
  renderItems() {
    const { rooms, isLoaded } = this.state
    if (isLoaded) {
      if (rooms.length > 0) {
        return rooms.map(r => (
          <RoomListingItem
            key={v4()}
            room={r}
            onDeleteClick={(room) => {
              this.deleteId = room.id
              this.handleToggleDialog()
            }}
          />
        ))
      }
      return (
        <h2 className="text-center">You dont have any rooms</h2>
      )
    }
    return (
      <h2 className="text-center">Loading...</h2>
    )
  }
  render() {
    const { isDialogActive } = this.state
    const action = [
      { label: 'Cancel', onClick: this.handleToggleDialog },
      { label: 'Yes', onClick: this.handleDelete },
    ]
    return (
      <div className={style.roomListingWrapper}>
        {this.renderItems()}
        <Dialog
          active={isDialogActive}
          actions={action}
          onEscKeyDown={this.handleToggleDialog}
          onOverlayClick={this.handleToggleDialog}
          title="Delete Confirmation"
        >
          <p>Are you sure want to delete this room?</p>
        </Dialog>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userId: state.auth.user.id,
  token: state.auth.token.accessToken,
})

export default connect(mapStateToProps)(RoomListing)
