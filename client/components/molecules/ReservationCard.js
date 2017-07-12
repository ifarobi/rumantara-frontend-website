import React, { Component } from 'react'
import { Card, CardTitle, CardActions } from 'react-toolbox/lib/card'
import Button from 'react-toolbox/lib/button'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import classnames from 'classnames'
import { List, ListItem } from 'react-toolbox/lib/list'
import moment from 'moment'
import Dialog from 'react-toolbox/lib/dialog'
import axios from 'axios'
import config from 'config'

import style from './styles/Room.css'

class ReservationCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dialogConfirm: false,
      reservation: this.props.reservation,
      status: this.props.reservation.status.id,
      statusName: this.props.reservation.status.name,
    }
    this.handleToggle = this.handleToggle.bind(this)
    this.handleReject = this.handleReject.bind(this)
    this.handleConfirm = this.handleConfirm.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }
  handleToggle(dialog) {
    this.setState({
      [dialog]: !this.state[dialog],
    })
  }
  handleConfirm() {
    axios.post(`${config.API_URL}/orders/accept-order/${this.state.reservation.id}`, {
      hoster_id: this.props.userId,
    }, {
      headers: {
        Authorization: `Bearer ${this.props.accessToken}`,
      },
    })
    .then((response) => {
      console.log(response)
      this.setState({
        status: 8,
        statusName: 'Order Accepted',
      })
      this.handleToggle('dialogConfirm')
    })
  }
  handleReject() {
    axios.post(`${config.API_URL}/orders/reject-order/${this.state.reservation.id}`, {
      hoster_id: this.props.userId,
    }, {
      headers: {
        Authorization: `Bearer ${this.props.accessToken}`,
      },
    })
    .then((response) => {
      console.log(response)
      this.setState({
        status: 9,
        statusName: 'Order Rejected',
      })
      this.handleToggle('dialogConfirm')
    })
  }
  handleDelete() {
    axios.delete(`${config.API_URL}/orders/${this.state.reservation.id}`, {
      headers: {
        Authorization: `Bearer ${this.props.accessToken}`,
      },
    })
    .then((response) => {
      console.log(response)
      this.props.onDelete(this.state.reservation.id)
    })
  }
  render() {
    const { reservation, status, statusName } = this.state
    let colorLabel = 'yellow'
    switch (status) {
      case 7:
        colorLabel = 'yellow'
        break
      case 8:
        colorLabel = 'green'
        break
      case 9:
        colorLabel = 'red'
        break
      default:
        colorLabel = 'yellow'
    }
    const { dialogConfirm } = this.state
    const confirmActions = [
      { label: 'Accept', onClick: () => this.handleConfirm() },
      { label: 'Decline', onClick: () => this.handleToggle('dialogConfirm') },
      { label: 'Cancel', onClick: () => this.handleToggle('dialogConfirm') },
    ]
    let btnActions
    if (this.props.type === 'room') {
      btnActions = (
        <div className="flex-self-end">
          <Button
            label="Detail"
            icon="search"
          />
          <Button
            icon="delete"
            label="Delete"
            onClick={this.handleDelete}
          />
        </div>
      )
    } else {
      btnActions = (
        <div className="flex-self-end">
          <Button
            label="Pay"
            icon="payment"
          />
          <Button
            icon="delete"
            label="Delete"
            onClick={this.handleDelete}
          />
        </div>
      )
    }
    return (
      <div>
        <Card className={style.roomListingItem}>
          <div
            className={style.imageWrapper}
            style={{
              backgroundImage: `url(${reservation.room.room_pictures[0].url})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center center',
            }}
          />
          <div className={style.listingOverview}>
            <CardTitle
              theme={style}
              title={reservation.room.name}
            />
            <span className={classnames(style.label, colorLabel)}>{statusName}</span>
            <div className={style.reservationContent}>
              <List ripple={false}>
                <ListItem
                  leftIcon="person"
                  caption={reservation.user.name}
                  rightIcon="open_in_new"
                />
                <ListItem
                  ripple={false}
                  caption={`${moment(reservation.start_date).format('DD-MMM-YYYY')} until ${moment(reservation.end_date).format('DD-MMM-YYYY')}`}
                  leftIcon="date_range"
                />
                <ListItem
                  ripple={false}
                  caption={`${reservation.total_guest} people`}
                  leftIcon="people"
                />
              </List>
            </div>
            <CardActions theme={style}>
              {btnActions}
            </CardActions>
          </div>
        </Card>
        <Dialog
          actions={confirmActions}
          active={dialogConfirm}
          onEscKeyDown={() => this.handleToggle('dialogConfirm')}
          onOverlayClick={() => this.handleToggle('dialogConfirm')}
        >
          <p>
            Blasdfasdf
          </p>
        </Dialog>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userId: state.auth.user.id,
  accessToken: state.auth.token.accessToken,
})

export default connect(mapStateToProps)(ReservationCard)
