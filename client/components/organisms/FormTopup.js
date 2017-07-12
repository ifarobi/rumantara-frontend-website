import React, { Component } from 'react'
import Input from 'react-toolbox/lib/input'
import axios from 'axios'
import config from 'config'
import { connect } from 'react-redux'
import { Snackbar, Button } from 'react-toolbox'
import moment from 'moment'

import Spinner from '../atoms/Spinner'
import price from '../../../common/helpers/price'

class FormTopup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      amount: 0,
      request_proof_url: null,
      snackbarType: 'warning',
      snackbarActive: false,
      snackbarMsg: '',
      loading: false,
      isDone: false,
      response: null,
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
  submit(e) {
    e.preventDefault()
    this.setState({ loading: true })
    axios.post(`${config.API_URL}/topup-requests`, {
      user_id: this.props.user.id,
      amount: parseInt(this.state.amount, 10),
    }, {
      headers: {
        Authorization: `Bearer ${this.props.token.accessToken}`,
      },
    })
    .then((response) => {
      console.log(response)
      if (response.data.message.indexOf('Created') !== -1) {
        if (typeof this.props.onSuccess !== 'undefined') {
          this.props.onSuccess(response.data)
        }
        this.setState({
          isDone: true,
          response: response.data,
          loading: false,
        })
      }
    })
    .catch((error) => {
      console.log(error)
      if (error.response.status === 403) {
        this.setState({
          snackbarMsg: error.response.data.message,
          snackbarActive: true,
        })
      }
    })
  }
  renderBody() {
    const { isDone, response, loading } = this.state
    if (loading) {
      return (
        <Spinner
          size={{
            width: '100%',
            height: '80px',
          }}
        />
      )
    } else if (isDone) {
      return (
        <div>
          <p>Transfer with amount <b>{response.amount}</b> to :</p>
          <table>
            <tbody>
              <tr>
                <td><img width="150px;" src="/public/images/BCA.jpg" alt="BCA" /></td>
                <td>
                  <b>932-239-8097</b><br />
                  Ilham Farobi<br />
                  cb: Supratman
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )
    }
    return (
      <div>
        <div className="formGroup">
          <Input name="amount" type="number" label="Amount" value={this.state.amount} onChange={this.handleChange} />
        </div>
        <div className="formGroup text-center">
          <Button
            type="submit"
            label="Submit"
            raised={true}
            primary={true}
          />
        </div>
      </div>
    )
  }
  render() {
    return (
      <form onSubmit={this.submit} method="post">
        {this.renderBody()}
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

export default connect(mapStateToProps)(FormTopup)
