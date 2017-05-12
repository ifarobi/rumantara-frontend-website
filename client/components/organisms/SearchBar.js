import React, { Component } from 'react'
import classnames from 'classnames'
import config from 'config'
import { GoogleApiWrapper } from 'google-maps-react'

import Input from 'react-toolbox/lib/input'
import Button from 'react-toolbox/lib/button'
import FontIcon from 'react-toolbox/lib/font_icon'
import DatePicker from 'react-toolbox/lib/date_picker'

import style from './styles/SearchBar.css'

class SearchBar extends Component {
  constructor(props) {
    super(props)
    const today = new Date()
    const tomorrow = new Date()
    tomorrow.setDate(today.getDate() + 1)
    this.state = {
      destination: 'Malang',
      checkIn: today,
      checkOut: tomorrow,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleCheckIn = this.handleCheckIn.bind(this)
    this.handleCheckOut = this.handleCheckOut.bind(this)
    this.renderInputPlace = this.renderInputPlace.bind(this)
    this.places = null
    this.autoComplete = null
  }
  componentWillMount() {
    if (this.places !== null) {
      console.log(this.places)
    }
  }
  handleCheckIn(val) {
    this.setState({ checkIn: val })
  }
  handleCheckOut(val) {
    this.setState({ checkOut: val })
  }
  handleChange(val) {
    this.setState({ destination: val })
  }
  renderInputPlace() {
    const { google, loaded } = this.props
    if (loaded) {
      if (this.places !== null) {
        const autocomplete = new google.maps.places.Autocomplete(
          this.places.refs.wrappedInstance.inputNode,
          {types: ['geocode']}
        )
      }
      return (
        <Input
          id="destination"
          type="text"
          icon="location_on"
          label="Destination"
          ref={(c) => { this.places = c }}
          value={this.state.destination}
          onChange={this.handleChange}
          name="destination"
        />
      )
    }
    return (<Input
      id="destination"
      type="text"
      icon="location_on"
      hint="Loading..."
      label="Loading"
      name="destination"
      disabled={true}
    />)
  }
  render() {

    return (
      <div className={classnames(style.searchContainer, 'pageContainer')}>
        <form>
          <div className="no-right-pad no-left-pad-xs">
            <div className="row">
              <div className="col-xs-12 col-md-6">
                {this.renderInputPlace()}
                {/* <input type="text"
                onChange={this.handleChange} ref={(c) => { this.places = c }} /> */}
              </div>
              <div className="col-xs-12 col-md-6">
                <div className="row">
                  <div className="col-xs-12 col-md-8">
                    <div className="row">
                      <div className="col-xs-5">
                        <DatePicker
                          label="Check In"
                          name="checkIn"
                          autoOk={true}
                          value={this.state.checkIn}
                          onChange={this.handleCheckIn}
                          sundayFirstDayOfWeek={true}
                        />
                      </div>
                      <div className="col-xs-2">
                        <FontIcon value="keyboard_arrow_right" className={style.arrowDate} />
                      </div>
                      <div className="col-xs-5">
                        <DatePicker
                          label="Check Out"
                          autoOk={true}
                          name="checkOut"
                          value={this.state.checkOut}
                          onChange={this.handleCheckOut}
                          sundayFirstDayOfWeek={true}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="no-right-pad col-xs-12 col-md-4">
                    <Button
                      className={classnames(style.buttonSearch, 'no-box-shadow', 'no-radius')}
                      primary={true}
                      raised={true}
                      label="Search"
                      icon="search"
                      type="submit"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: config.GOOGLE_API_KEY,
  libraries: ['places'],
  version: '3.27'
})(SearchBar)
