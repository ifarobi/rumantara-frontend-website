import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import config from 'config'
import { Button } from 'react-toolbox/lib/button'
import Dialog from 'react-toolbox/lib/dialog'

import Panel from '../../components/organisms/Panel'
import Image from '../../components/atoms/Image'
import Anchor from '../../components/atoms/Anchor'
import FormTopup from '../../components/organisms/FormTopup'

import price from '../../../common/helpers/price'

import style from '../styles/Dashboard.css'

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      balance: 0,
      dialogBalance: false,
    }
    this.handleToggle = this.handleToggle.bind(this)
  }
  componentWillMount() {
    const { user, token } = this.props
    axios.get(`${config.API_URL}/user-credits/${user.id}`, {
      headers: {
        Authorization: `Bearer ${token.accessToken}`,
      },
    })
    .then((response) => {
      if (response.data.amount) {
        this.setState({
          balance: response.data.amount,
        })
      }
    })
  }
  handleToggle() {
    this.setState({
      dialogBalance: !this.state.dialogBalance,
    })
  }
  render() {
    const { user } = this.props
    const photoProfile = user.profile.data.profile_photo_url !== null ? user.profile.data.profile_photo_url : '/public/images/default_user.png'
    return (
      <section className="pageContainer">
        <div className="row">
          <div className="col-sm-5 col-md-3">
            <div className={style.photoContainer}>
              <Image src={photoProfile} alt={user.name} full={true} />
            </div>
            <Panel className="text-center">
              <h2 className={style.userName}>{user.name}</h2>
              <div>
                <span>Status: {user.profile.data.status}</span>
              </div>
              <Anchor primary={true} to={`/show/user/${user.id}`}>View Profile</Anchor>
              <br />
              <Anchor primary={true} to="/dashboard/profile">Edit Profile</Anchor>
            </Panel>
            <Panel title="Balance">
              <div className="text-center">
                <h3 className={style.balance}>{price(this.state.balance)}</h3>
                <Button
                  raised={true}
                  className={style.btnBalance}
                  icon="file_upload"
                  label="Topup"
                  accent={true}
                  onClick={this.handleToggle}
                />
                <Button raised={true} primary={true} className={style.btnBalance} icon="file_download" label="Withdraw" />
              </div>
            </Panel>
          </div>
          <div className="col-sm-7 col-md-9">
            <Panel title="Notification">
              <p>Please confirm your email address by clicking on the link we just emailed you. If you cannot find the email, you can</p>
            </Panel>
          </div>
          <Dialog
            active={this.state.dialogBalance}
            onEscKeyDown={this.handleToggle}
            onOverlayClick={this.handleToggle}
            type="small"
          >
            <FormTopup
              onSuccess={() => {
                this.handleToggle()
              }}
            />
          </Dialog>
        </div>
      </section>
    )
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  token: state.auth.token,
})

export default connect(mapStateToProps)(Dashboard)
