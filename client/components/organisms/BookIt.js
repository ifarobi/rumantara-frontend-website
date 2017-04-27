import React, { Component } from 'react'
import Dropdown from 'react-toolbox/lib/dropdown'
import DatePicker from 'react-toolbox/lib/date_picker'
import Button from 'react-toolbox/lib/button'
import classnames from 'classnames'

import style from './styles/BookIt.css'

class BookIt extends Component {
  constructor(props) {
    super(props)
    const today = new Date()
    const tomorrow = new Date()
    const maxDate = new Date()
    const minDate = new Date()
    tomorrow.setDate(today.getDate() + this.props.minOrder)
    this.state = {
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
  }
  handleSubmit(e) {
    e.preventDefault()
    console.log('submit book')
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
    return (
      <div className={style.bookItContainer}>
        <div className={style.detailRoomPrice}>
          <span className={style.price}>
            {this.props.price}
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
                    type="submit"
                    primary={true}
                    accent={true}
                    raised={true}
                    className={classButton}
                    onClick={this.handleSubmit}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default BookIt
