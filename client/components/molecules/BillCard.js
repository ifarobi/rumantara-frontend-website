import React, { Component } from 'react'
import { Card, CardTitle, CardActions } from 'react-toolbox/lib/card'
import Button from 'react-toolbox/lib/button'
import { Snackbar } from 'react-toolbox';
import Dialog from 'react-toolbox/lib/dialog'
import FontIcon from 'react-toolbox/lib/font_icon'
import classnames from 'classnames'
import moment from 'moment'
import axios from 'axios'
import config from 'config'
import { connect } from 'react-redux'
import { List, ListItem } from 'react-toolbox/lib/list'

import style from './styles/Room.css'
import price from '../../../common/helpers/price'

class BillCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dialogConfirm: false,
      bill: props.bill,
      msg: '',
      billStatus: props.bill.status,
      snackbarType: 'cancel',
      snackbarActive: false,
    }
    this.handleToggle = this.handleToggle.bind(this)
    this.handlePayment = this.handlePayment.bind(this)
    this.handleSnackbarClick = this.handleSnackbarClick.bind(this)
  }
  handlePayment() {
    this.setState({
      dialogConfirm: false,
    })
    if (this.props.balance.amount < this.state.bill.gross) {
      this.setState({
        snackbarActive: true,
        msg: `Your balance is ${price(this.props.balance.amount)}, not enough to do this transaction.`,
        snackbarType: 'cancel',
      })
    } else {
      axios.post(`${config.API_URL}/bills/pay-bill/${this.state.bill.id}`, null, {
        headers: {
          Authorization: `Bearer ${this.props.accessToken}`,
        },
      })
      .then((response) => {
        console.log(response)
        this.setState({
          billStatus: {
            id: 11,
            name: 'Bill paid',
          },
        })
      })
    }
  }
  handleSnackbarClick() {
    this.setState({
      snackbarActive: false,
    })
  }
  handleToggle(dialog) {
    this.setState({
      [dialog]: !this.state[dialog],
    })
  }
  render() {
    const { bill, billStatus } = this.state
    const { dialogConfirm } = this.state
    let colorLabel
    if (billStatus.id === 10) colorLabel = 'yellow'
    else if (billStatus.id === 11) colorLabel = 'green'
    else colorLabel = 'red'
    let content
    let btnActions
    if (this.props.type === 'hoster') {
      content = (
        <div className="row">
          <div className="col-sm-6">
            <List>
              <ListItem ripple={false} caption={`${bill.order.total_guest} People`} leftIcon="people" />
              <ListItem ripple={false} caption={`${bill.order.number_of_day} Days`} leftIcon="access_time" />
            </List>
          </div>
          <div className="col-sm-6">
            <List>
              <ListItem caption={`${bill.order.user.name}`} rightIcon="open_in_new" leftIcon="person" />
            </List>
          </div>
        </div>
      )
      btnActions = (
        <div>
          <Button
            icon="search"
            label="Detail"
          />
        </div>
      )
    } else {
      content = (
        <div className="row">
          <div className="col-sm-12">
            <List>
              <ListItem ripple={false} caption={`${bill.order.total_guest} People`} leftIcon="people" />
              <ListItem ripple={false} caption={`${bill.order.number_of_day} Days`} leftIcon="access_time" />
            </List>
          </div>
        </div>
      )
      btnActions = (
        <div>
          <Button
            icon="check"
            label="Pay"
            onClick={() => (this.handleToggle('dialogConfirm'))}
          />
          <Button
            icon="search"
            label="Detail"
          />
        </div>
      )
    }
    return (
      <div>
        <Card className={style.roomListingItem}>
          <div className={classnames(style.billPriceWrapper, 'text-center')}>
            <span className={classnames(style.label, colorLabel)}>{billStatus.name}</span>
            <div className={style.priceContent}>
              <FontIcon value="payment" />
              <h2 className={style.billPrice}>{price(bill.gross)}</h2>
            </div>
            <div className={style.billDateWrapper}>
              <span className={style.billDate}>{moment(bill.order.start_date).format('DD-MMM-YYYY')}</span>
              <div>
                <span>to</span>
              </div>
              <span className={style.billDate}>{moment(bill.order.end_date).format('DD-MMM-YYYY')}</span>
            </div>
          </div>
          <div className={style.listingOverview}>
            <CardTitle
              theme={style}
              title={bill.order.room.name}
            />
            <div>
              { content }
            </div>
            <CardActions>
              { btnActions }
            </CardActions>
          </div>
        </Card>
        <Dialog
          active={dialogConfirm}
          onEscKeyDown={() => this.handleToggle('dialogConfirm')}
          onOverlayClick={() => this.handleToggle('dialogConfirm')}
          actions={[
            { label: 'Yes', onClick: this.handlePayment },
            { label: 'No', onClick: () => (this.handleToggle('dialogConfirm')) },
          ]}
        >
          <p>
            Your balance will be reduced by <b>{price(bill.gross)}</b> to pay this bill. Want to continue?
          </p>
        </Dialog>
        <Snackbar
          action='Dismiss'
          active={this.state.snackbarActive}
          label={this.state.msg}
          onClick={this.handleSnackbarClick}
          type={this.state.snackbarType}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  balance: state.balance,
  accessToken: state.auth.token.accessToken,
})

export default connect(mapStateToProps)(BillCard)
