import React, { Component } from 'react'
import Input from 'react-toolbox/lib/input'
import axios from 'axios'
import config from 'config'
import { connect } from 'react-redux'
import { Snackbar, Button } from 'react-toolbox'

class FormWithdraw extends Component {
  constructor(props) {
    super(props)
    this.state = {
      amount: 100000,
      snackbarType: 'warning',
      snackbarActive: false,
      snackbarMsg: '',
    }
    this.file = null
    this.handleChange = this.handleChange.bind(this)
    this.submit = this.submit.bind(this)
    this.handleSnackbarClick = this.handleSnackbarClick.bind(this)
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
      axios.post(`${config.API_URL}/withdraw-requests`, {
        user_id: this.props.user.id,
        amount: this.state.amount,
      }, {
        headers: {
          Authorization: `Bearer ${this.props.token.accessToken}`,
        },
      })
      .then((response) => {
        if (response.status === 201) {
          this.props.onSuccess({
            amount: this.state.amount,
          })
          this.setState({
            snackbarMsg: 'Your withdrawal request is processed by admin, you will get notify soon after withdrawal success.',
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
    return (
      <form>
        <div className="formGroup">
          <Input
            type="number"
            name="amount"
            min={100000}
            label="Amount"
            value={this.state.amount}
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

export default connect(mapStateToProps)(FormWithdraw)
