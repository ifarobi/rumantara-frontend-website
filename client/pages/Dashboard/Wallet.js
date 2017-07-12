import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-toolbox'
import { v4 } from 'uuid'
import moment from 'moment'
import Dialog from 'react-toolbox/lib/dialog'
import { Table, TableHead, TableCell, TableRow } from 'react-toolbox/lib/table'
import axios from 'axios'
import config from 'config'

import Panel from '../../components/organisms/Panel'
import FormTopup from '../../components/organisms/FormTopup'
import FormConfirmTopup from '../../components/organisms/FormConfirmTopup'
import price from '../../../common/helpers/price'

class Wallet extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dialogBalance: false,
      dialogConfirm: false,
      topupList: [],
      activeDataPayment: null,
    }
    this.handleToggle = this.handleToggle.bind(this)
    this.renderTableTopup = this.renderTableTopup.bind(this)
  }
  componentWillMount() {
    axios.get(`${config.API_URL}/topup-requests/get-user-topups/${this.props.userId}`, {
      headers: {
        Authorization: `Bearer ${this.props.accessToken}`,
      },
    })
    .then((response) => {
      this.setState({ topupList: response.data })
    })
  }
  handleDialogPay(data) {
    this.setState({
      activeDataPayment: data,
    })
    this.handleToggle('dialogConfirm')
  }
  handleToggle(dialog) {
    this.setState({
      [dialog]: !this.state[dialog],
    })
  }
  renderTableTopup() {
    const { topupList } = this.state
    if (topupList.length > 0) {
      const rows = topupList.map((d, i) => {
        let action = null
        if (d.status_id === 13) {
          action = (
            <Button
              raised={true}
              accent={true}
              label="Pay"
              onClick={() => this.handleDialogPay(d)}
            />
          )
        } else {
          action = (
            <Button
              raised={true}
              primary={true}
              label="Detail"
              onClick={() => {}}
            />
          )
        }
        return (
          <TableRow key={v4()}>
            <TableCell>{ i + 1 }</TableCell>
            <TableCell>{moment(d.created_at).format('DD MMMM YYYY, h:mm a')}</TableCell>
            <TableCell>{price(d.amount)}</TableCell>
            <TableCell>{d.status.name}</TableCell>
            <TableCell>{action}</TableCell>
          </TableRow>
        )
      })
      return (
        <Table selectable={false}>
          <TableHead>
            <TableCell>No.</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Action</TableCell>
          </TableHead>
          {rows}
        </Table>
      )
    }
    return (
      <h4 className="text-center">Loading...</h4>
    )
  }
  render() {
    const { amount } = this.props
    return (
      <div>
        <Panel title="Remaining Balance">
          <div className="row">
            <div className="col-sm-9">
              <h2>
                {price(amount)}
              </h2>
            </div>
            <div className="col-sm-3 text-right">
              <Button
                label="Add Balance"
                onClick={() => (this.handleToggle('dialogBalance'))}
                accent={true}
                raised={true}
              />
            </div>
          </div>
        </Panel>
        {this.renderTableTopup()}
        <Dialog
          active={this.state.dialogBalance}
          onEscKeyDown={() => (this.handleToggle('dialogBalance'))}
          onOverlayClick={() => (this.handleToggle('dialogBalance'))}
          type="small"
        >
          <FormTopup />
        </Dialog>
        <Dialog
          active={this.state.dialogConfirm}
          onEscKeyDown={() => (this.handleToggle('dialogConfirm'))}
          onOverlayClick={() => (this.handleToggle('dialogConfirm'))}
          type="small"
        >
          <FormConfirmTopup
            data={this.state.activeDataPayment}
            onSuccess={() => {
              console.log('success')
            }}
          />
        </Dialog>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  amount: state.balance.amount,
  userId: state.auth.user.id,
  accessToken: state.auth.token.accessToken,
})

export default connect(mapStateToProps)(Wallet)
