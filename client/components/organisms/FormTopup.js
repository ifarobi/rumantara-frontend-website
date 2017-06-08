import React, { Component } from 'react'
import Input from 'react-toolbox/lib/input'
import axios from 'axios'
import config from 'config'
import { connect } from 'react-redux'

import UploadBox from './UploadBox'
import { storage } from '../../../common/helpers/firebase'

class FormTopup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      amount: 0,
      request_proof_url: null,
    }
    this.file = null
    this.handleChange = this.handleChange.bind(this)
    this.submit = this.submit.bind(this)
  }
  handleChange(val, el) {
    this.setState({ [el.target.name]: val })
  }
  handleUpload() {
    const file = this.file
    const storageRef = storage.ref()
    const meta = {
      contentType: 'image/jpeg',
    }
    const now = new Date()
    const newImage = storageRef.child(`images/topup/${now.getTime()}.jpg`)
    newImage.put(file[0], meta).then((snap) => {
      this.setState({
        request_proof_url: snap.downloadURL,
      })
      this.submit()
    })
  }
  submit() {
    axios.post(`${config.API_URL}/topup-requests`, {
      user_id: this.props.user.id,
      amount: this.state.amount,
      request_proof_url: this.state.request_proof_url,
    }, {
      headers: {
        Authorization: `Bearer ${this.props.token.accessToken}`,
      },
    })
    .then((response) => {
      if (response.data.message.indexOf('Created') !== -1) {
        this.props.onSuccess(response.data)
      }
    })
  }
  render() {
    return (
      <form>
        <div className="formGroup">
          <Input name="amount" type="number" label="Amount" value={this.state.amount} onChange={this.handleChange} />
        </div>
        <div className="formGroup">
          <UploadBox
            title="Upload the proof of transfer"
            height="150px"
            callbackChangePict={(file) => {
              this.file = file
            }}
            onUpload={(file) => {
              this.file = file
              this.handleUpload()
            }}
            buttonLabel="Save"
          />
        </div>
      </form>
    )
  }
}

const mapStateToProps = state => ({
  token: state.auth.token,
  user: state.auth.user,
})

export default connect(mapStateToProps)(FormTopup)
