import React, { Component } from 'react'
import classnames from 'classnames'
import { Grid, Row, Col } from 'react-flexbox-grid'

import Input from 'react-toolbox/lib/input'
import Button from 'react-toolbox/lib/button'
import FontIcon from 'react-toolbox/lib/font_icon'
import DatePicker from 'react-toolbox/lib/date_picker'

import style from './styles/SearchBar.css'

class SearchBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      destination: '',
      checkIn: '',
      checkOut: '',
    }
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(value, event) {
    this.setState({ ...this.state, [event.target.name]: value })
  }
  render() {
    return (
      <div className={classnames(style.searchContainer, 'pageContainer')}>
        <form>
          <Grid fluid={true} className="no-right-pad no-left-pad-xs">
            <Row>
              <Col xs={12} md={6}>
                <Input
                  id="destination"
                  type="text"
                  icon="location_on"
                  hint="Destination"
                  label="Destination"
                  name="destination"
                  onChange={this.handleChange}
                  value={this.state.destination}
                />
              </Col>
              <Col xs={12} md={6}>
                <Row>
                  <Col xs={12} md={8}>
                    <Row>
                      <Col xs={5}>
                        <DatePicker
                          label="Check In"
                          name="checkIn"
                          value={this.state.checkIn}
                          onChange={this.handleChange}
                          sundayFirstDayOfWeek={true}
                        />
                      </Col>
                      <Col xs={2}>
                        <FontIcon value="keyboard_arrow_right" className={style.arrowDate} />
                      </Col>
                      <Col xs={5}>
                        <DatePicker
                          label="Check Out"
                          name="checkOut"
                          value={this.state.checkOut}
                          onChange={this.handleChange}
                          sundayFirstDayOfWeek={true}
                        />
                      </Col>
                    </Row>
                  </Col>
                  <Col xs={12} md={4} className="no-right-pad">
                    <Button
                      className={classnames(style.buttonSearch, 'no-box-shadow', 'no-radius')}
                      primary={true}
                      raised={true}
                      label="Search"
                      icon="search"
                      type="submit"
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Grid>
        </form>
      </div>
    )
  }
}

export default SearchBar
