import React, { Component } from 'react'
import config from 'config'
import axios from 'axios'
import { connect } from 'react-redux'

import UploadBox from './UploadBox'
import { storage } from '../../../common/helpers/firebase'

class FormConfirmTopup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      request_proof_url: null,
    }
    this.handleUpload = this.handleUpload.bind(this)
    this.update = this.update.bind(this)
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
      this.update()
    })
  }
  update() {
    const { token, data } = this.props
    axios.put(`${config.API_URL}/topup-requests/${data.id}`, {
      request_proof_url: this.state.request_proof_url,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      console.log(response)
    })
  }
  render() {
    const { data } = this.props
    return (
      <div>
        <p>Transfer with amount <b>{data.amount}</b> to :</p>
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
        <p>If already transfer you can upload the proof here:</p>
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
    )
  }
}

const mapStateToProps = state => ({
  token: state.auth.token.accessToken,
})

export default connect(mapStateToProps)(FormConfirmTopup)
