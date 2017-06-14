import React, { Component } from 'react'
import Input from 'react-toolbox/lib/input'
import Dropdown from 'react-toolbox/lib/dropdown'
import axios from 'axios'
import config from 'config'
import { connect } from 'react-redux'
import { Snackbar, Button } from 'react-toolbox'

class FormFeedback extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rating: 0,
      details: '',
      snackbarType: 'warning',
      snackbarActive: false,
      snackbarMsg: '',
    }
    this.file = null
    this.handleChange = this.handleChange.bind(this)
    this.submit = this.submit.bind(this)
    this.handleSnackbarClick = this.handleSnackbarClick.bind(this)
    this.handleRatingChange = this.handleRatingChange.bind(this)
  }
  handleRatingChange(val) {
    this.setState({ rating: val })
  }
  handleSnackbarClick() {
    this.setState({
      snackbarActive: false,
    })
  }
  handleChange(val, el) {
    this.setState({ [el.target.name]: val })
  }
  submit() {
    if (this.props.token !== null) {
      axios.post(`${config.API_URL}/room-feedbacks`, {
        user_id: this.props.user.id,
        rating: this.state.rating,
        room_id: this.props.roomId,
        details: this.state.details,
      }, {
        headers: {
          Authorization: `Bearer ${this.props.token.accessToken}`,
        },
      })
      .then((response) => {
        if (response.status === 201) {
          this.props.onSuccess({
            rating: this.state.rating,
            details: this.state.details
          })
          this.setState({
            snackbarMsg: 'Feedback posted',
            snackbarActive: true,
            snackbarType: 'accept',
          })
        }
      })
    } else {
      this.setState({
        snackbarMsg: 'You need to login to give this room feedback.',
        snackbarActive: true,
        snackbarType: 'warning',
      })
    }
  }
  render() {
    const labelRating = [
      { label: 'Choose Rating', value: 0 },
      { label: '1', value: 1 },
      { label: '2', value: 2 },
      { label: '3', value: 3 },
      { label: '4', value: 4 },
      { label: '5', value: 5 },
    ]
    return (
      <form>
        <div className="formGroup">
          <Dropdown
            source={labelRating}
            onChange={this.handleRatingChange}
            value={this.state.rating}
          />
        </div>
        <div className="formGroup">
          <Input
            type="text"
            name="details"
            rows={4}
            multiline={true}
            label="Details"
            value={this.state.details}
            onChange={this.handleChange}
          />
        </div>
        <Button
          label="Post"
          primary={true}
          flat={true}
          raised={true}
          onClick={this.submit}
        />
        <Snackbar
          action="Dismiss"
          active={this.state.snackbarActive}
          label={this.state.snackbarMsg}
          onClick={this.handleSnackbarClick}
          type={this.state.snackbarType}
        />
      </form>
    )
  }
}

const mapStateToProps = state => ({
  token: state.auth.token,
  user: state.auth.user,
})

export default connect(mapStateToProps)(FormFeedback)
