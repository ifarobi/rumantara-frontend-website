import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button } from 'react-toolbox/lib/button'
import Dialog from 'react-toolbox/lib/dialog'
import FontIcon from 'react-toolbox/lib/font_icon'

import Panel from '../../components/organisms/Panel'
import Image from '../../components/atoms/Image'
import Anchor from '../../components/atoms/Anchor'
import FormWithdraw from '../../components/organisms/FormWithdraw'
import FormTopup from '../../components/organisms/FormTopup'
import axios from 'axios'
import config from 'config'

import price from '../../../common/helpers/price'
import { reinitBalance } from '../../../common/actions/balance'

import style from '../styles/Dashboard.css'

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dialogBalance: false,
      income: null,
      orders: null,
      dialogWithdraw: false,
    }
    this.handleToggle = this.handleToggle.bind(this)
    this.renderIncome = this.renderIncome.bind(this)
    this.renderOrders = this.renderOrders.bind(this)
  }
  componentWillMount() {
    this.props.reinitBalance(this.props.user.id)
    axios.get(`${config.API_URL}/dashboard/get-monthly-income`, {
      headers: {
        Authorization: `Bearer ${this.props.token.accessToken}`,
      },
    })
    .then((response) => {
      this.setState({
        income: response.data,
      })
    })
    axios.get(`${config.API_URL}/dashboard/get-average-order-per-month`, {
      headers: {
        Authorization: `Bearer ${this.props.token.accessToken}`,
      },
    })
    .then((response) => {
      this.setState({
        orders: response.data,
      })
    })
    axios.get(`${config.API_URL}/dashboard/get-current-order`, {
      headers: {
        Authorization: `Bearer ${this.props.token.accessToken}`,
      },
    })

  }
  renderIncome() {
    const { income } = this.state
    if (income !== null) {
      let font = null
      if (income.current_month >= income.last_month) {
        font = (
          <FontIcon
            value="arrow_drop_up"
          />
        )
      } else {
        font = (
          <FontIcon
            value="arrow_drop_down"
          />
        )
      }
      return (
        <div className="text-center" style={{ padding: '9.5px 0px' }}>
          <span className={style.bigVal}>{price(income.current_month)}</span>
          {font}
        </div>
      )
    }
    return (
      <p className="text-center">Loading...</p>
    )
  }
  renderOrders() {
    const { orders } = this.state
    if (orders !== null) {
      let font = null
      if (orders.current_year >=orders.last_year) {
        font = (
          <FontIcon
            value="arrow_drop_up"
          />
        )
      } else {
        font = (
          <FontIcon
            value="arrow_drop_down"
          />
        )
      }
      return (
        <div className="text-center">
          <span className={style.bigVal}>{orders.current_year}</span>
          {font}
          <div>
            <small><span>From: {orders.total_order} Orders</span></small>
          </div>
        </div>
      )
    }
    return (
      <p className="text-center">Loading...</p>
    )
  }
  handleToggle(dialog) {
    this.setState({
      [dialog]: !this.state[dialog],
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
                <h3 className={style.balance}>{price(this.props.balance)}</h3>
                <Button
                  raised={true}
                  className={style.btnBalance}
                  icon="file_upload"
                  label="Topup"
                  accent={true}
                  onClick={() => (this.handleToggle('dialogBalance'))}
                />
                <Button
                  raised={true}
                  primary={true}
                  className={style.btnBalance}
                  icon="file_download"
                  label="Withdraw"
                  onClick={() => (this.handleToggle('dialogWithdraw'))}
                />
              </div>
            </Panel>
          </div>
          <div className="col-sm-7 col-md-9">
            <div className="row">
              <div className="col-sm-6">
                <Panel title="Average order of your room">
                  {this.renderOrders()}
                </Panel>
              </div>
              <div className="col-sm-6">
                <Panel title="You Monthly Income">
                  {this.renderIncome()}
                </Panel>
              </div>
            </div>
            <Panel title="Notification">
              <p>Please confirm your email address by clicking on the link we just emailed you. If you cannot find the email, you can</p>
            </Panel>
          </div>
          <Dialog
            active={this.state.dialogBalance}
            onEscKeyDown={() => (this.handleToggle('dialogBalance'))}
            onOverlayClick={() => (this.handleToggle('dialogBalance'))}
            type="small"
          >
            <FormTopup
              onSuccess={() => {
                this.handleToggle('dialogBalance')
              }}
            />
          </Dialog>
          <Dialog
            type="small"
            active={this.state.dialogWithdraw}
            onEscKeyDown={() => (this.handleToggle('dialogWithdraw'))}
            onOverlayClick={() => (this.handleToggle('dialogWithdraw'))}
          >
            <FormWithdraw
              onSuccess={() => {
                this.handleToggle('dialogWithdraw')
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
  balance: state.balance.amount,
  token: state.auth.token,
})

const mapDispatchToProps = dispatch => ({
  reinitBalance: bindActionCreators(reinitBalance, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
