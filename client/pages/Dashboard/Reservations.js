import React from 'react'
import { List, ListSubHeader } from 'react-toolbox/lib/list'

import style from '../styles/Dashboard.css'
import AnchorListItem from '../../components/atoms/AnchorListItem'

const Reservations = ({
  children,
}) => (
  <section className="pageContainer">
    <div className="row">
      <div className="col-sm-3">
        <List>
          <ListSubHeader caption="Your Reservations" />
          <AnchorListItem to="/dashboard/reservations/" caption="Travel Reservations" />
          <AnchorListItem to="/dashboard/reservations/room" caption="Room Reservations" />
          <ListSubHeader caption="Your Transactions" />
          <AnchorListItem to="/dashboard/reservations/unpaid" caption="Unpaid Transactions" />
          <AnchorListItem to="/dashboard/reservations/paid" caption="Paid Transactions" />
          <AnchorListItem to="/dashboard/reservations/bills" caption="Room Transaction" />
        </List>
      </div>
      <div className="col-sm-9">
        {children}
      </div>
    </div>
  </section>
)

export default Reservations
