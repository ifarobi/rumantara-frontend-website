import React, { Component } from 'react'
import Dropdown from 'react-toolbox/lib/dropdown'
import DatePicker from 'react-toolbox/lib/date_picker'
import Button from 'react-toolbox/lib/button'
import classnames from 'classnames'

import style from './styles/BookIt.css'

class BookIt extends Component {
  constructor(props) {
    super(props)
    this.state = {
      checkIn: '',
      checkOut: '',
      person: 1,
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
    this.setState({ checkIn: val })
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
                    onChange={this.handleCheckIn}
                  />
                </div>
                <div className="col-xs-6">
                  <DatePicker
                    label="Check Out"
                    autoOk={true}
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
