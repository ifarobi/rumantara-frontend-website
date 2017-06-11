import React, { Component } from 'react'
import { Card, CardTitle, CardActions } from 'react-toolbox/lib/card'
import Button from 'react-toolbox/lib/button'
import Dialog from 'react-toolbox/lib/dialog'
import FontIcon from 'react-toolbox/lib/font_icon'
import classnames from 'classnames'
import moment from 'moment'
import { List, ListItem } from 'react-toolbox/lib/list'

import style from './styles/Room.css'
import price from '../../../common/helpers/price'

class BillCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dialogConfirm: false,
    }
  }
  handleToggle(dialog) {
    this.setState({
      [dialog]: !this.state[dialog],
    })
  }
  render() {
    const { bill } = this.props
    const { dialogConfirm } = this.state
    let colorLabel
    if (bill.status.id === 10) colorLabel = 'yellow'
    else if (bill.status.id === 11) colorLabel = 'green'
    else colorLabel = 'red'
    return (
      <div>
        <Card className={style.roomListingItem}>
          <div className={classnames(style.billPriceWrapper, 'text-center')}>
            <span className={classnames(style.label, colorLabel)}>{bill.status.name}</span>
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
              <List>
                <ListItem ripple={false} caption={`${bill.order.total_guest} People`} leftIcon="person" />
                <ListItem ripple={false} caption={`${bill.order.number_of_day} Days`} leftIcon="access_time" />
              </List>
            </div>
            <CardActions>
              <Button
                icon="check"
                label="Pay"
              />
              <Button
                icon="search"
                label="Detail"
              />
            </CardActions>
          </div>
        </Card>
        <Dialog
          active={dialogConfirm}
          onEscKeyDown={() => this.handleToggle('dialogConfirm')}
          onOverlayClick={() => this.handleToggle('dialogConfirm')}
        >
          <p>
            Blasdfasdf
          </p>
        </Dialog>
      </div>
    )
  }
}

export default BillCard
