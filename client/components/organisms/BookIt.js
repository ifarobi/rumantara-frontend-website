import React, { Component } from 'react'
import Dropdown from 'react-toolbox/lib/dropdown'
import DatePicker from 'react-toolbox/lib/date_picker'
import Button from 'react-toolbox/lib/button'
import Dialog from 'react-toolbox/lib/dialog'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux'
import axios from 'axios'
import config from 'config'
import moment from 'moment'

import style from './styles/BookIt.css'
import price from '../../../common/helpers/price'

class BookIt extends Component {
  constructor(props) {
    super(props)
    const today = new Date()
    const tomorrow = new Date()
    const maxDate = new Date()
    const minDate = new Date()
    tomorrow.setDate(today.getDate() + this.props.minOrder)
    this.state = {
      dialogConfirm: false,
      checkIn: today,
      checkOut: tomorrow,
      person: 1,
      maxDate: new Date(maxDate.setDate(today.getDate() + this.props.maxOrder)),
      minDate: new Date(minDate.setDate(today.getDate() - 1)),
      checkOutMinDate: new Date(minDate.setDate(today.getDate() - 1)),
    }
    this.persons = []
    for (let i = 0; i < this.props.maxPerson; i += 1) {
      this.persons.push({
        value: (i + 1),
        label: `${i + 1} People`,
      })
    }
    this.handleCheckIn = this.handleCheckIn.bind(this)
    this.handleCheckOut = this.handleCheckOut.bind(this)
    this.handlePerson = this.handlePerson.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleToggle = this.handleToggle.bind(this)
  }
  handleToggle() {
    this.setState({
      dialogConfirm: !this.state.dialogConfirm,
    })
  }
  handleSubmit(e) {
    const { checkIn, checkOut } = this.state
    axios.post(`${config.API_URL}/orders`, {
      user_id: this.props.userId,
      room_id: this.props.roomId,
      start_date: moment(checkIn).format('YYYY-MM-DD'),
      end_date: moment(checkOut).format('YYYY-MM-DD'),
      total_guest: this.state.person,
    }, {
      headers: {
        Authorization: `Bearer ${this.props.accessToken}`,
      },
    })
    .then((response) => {
      console.log(response)
      this.props.push('/dashboard/reservations')
    })
  }
  handleCheckOut(val) {
    this.setState({ checkOut: val })
  }
  handleCheckIn(val) {
    const newMaxDate = new Date(val)
    const newCheckIn = new Date(val)
    const newCheckOut = new Date(val)
    newCheckOut.setDate(val.getDate() + this.props.minOrder)
    newMaxDate.setDate(val.getDate() + this.props.maxOrder)
    this.setState({
      checkIn: newCheckIn,
      checkOutMinDate: newCheckIn,
      checkOut: newCheckOut,
      maxDate: newMaxDate,
    })
  }
  handlePerson(val) {
    this.setState({ person: val })
  }
  render() {
    const classButton = classnames('btn-red', style.btnRequest)
    const { dialogConfirm } = this.state
    return (
      <div className={style.bookItContainer}>
        <div className={style.detailRoomPrice}>
          <span className={style.price}>
            {price(this.props.price)}
          </span>
          / night
        </div>
        <div className="panel">
          <div className="panel-body">
            <form method="post">
              <div className="row">
                <div className="col-xs-6">
                  <DatePicker
                    label="Check In"
                    autoOk={true}
                    value={this.state.checkIn}
                    minDate={this.state.minDate}
                    onChange={this.handleCheckIn}
                  />
                </div>
                <div className="col-xs-6">
                  <DatePicker
                    label="Check Out"
                    autoOk={true}
                    maxDate={this.state.maxDate}
                    minDate={this.state.checkOutMinDate}
                    value={this.state.checkOut}
                    onChange={this.handleCheckOut}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12">
                  <Dropdown
                    label="Guests"
                    source={this.persons}
                    onChange={this.handlePerson}
                    value={this.state.person}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12">
                  <Button
                    label="Request to Book"
                    primary={true}
                    accent={true}
                    raised={true}
                    className={classButton}
                    onClick={this.handleToggle}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
        <Dialog
          actions={[
            { label: 'Yes', onClick: this.handleSubmit },
            { label: 'No', onClick: this.handleToggle },
          ]}
          type="small"
          active={dialogConfirm}
          onEscKeyDown={this.handleToggle}
          onOverlayClick={this.handleToggle}
        >
          <p>Are you sure want to order this room?</p>
        </Dialog>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userId: state.auth.user.id,
  accessToken: state.auth.token.accessToken,
  balance: state.balance.amount,
})

const mapDispatchToProps = dispatch => ({
  push: bindActionCreators(push, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(BookIt)
