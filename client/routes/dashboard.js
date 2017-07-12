import React from 'react'

import { Route, IndexRoute } from 'react-router'

import Dashboard from '../components/templates/Dashboard'
import Reservations from '../pages/Dashboard/Reservations'
import Profile from '../pages/Dashboard/Profile'
import Rooms from '../pages/Dashboard/Rooms'
import DashboardPage from '../pages/Dashboard/Dashboard'

import TravelReservations from '../pages/Dashboard/Reservations/Travel'
import RoomReservations from '../pages/Dashboard/Reservations/Room'

import FormProfile from '../components/organisms/FormProfile'
import FormRoom from '../components/organisms/FormRoom'
import RoomListing from '../components/organisms/RoomListing'

import Unpaid from '../pages/Dashboard/Transactions/Unpaid'
import Paid from '../pages/Dashboard/Transactions/Paid'
import RoomBills from '../pages/Dashboard/Transactions/Room'
import Wallet from '../pages/Dashboard/Wallet'

const dashboard = (
  <Route path="dashboard" component={Dashboard}>
    <IndexRoute component={DashboardPage} />
    <Route path="profile" component={Profile}>
      <IndexRoute component={FormProfile} />
      <Route path="wallet" component={Wallet} />
    </Route>
    <Route path="rooms" component={Rooms}>
      <IndexRoute component={RoomListing} />
      <Route path="new" component={FormRoom} />
      <Route path="edit/:id" component={FormRoom} />
    </Route>
    <Route path="reservations" component={Reservations}>
      <IndexRoute component={TravelReservations} />
      <Route path="room" component={RoomReservations} />
      <Route path="unpaid" component={Unpaid} />
      <Route path="paid" component={Paid} />
      <Route path="bills" component={RoomBills} />
    </Route>
  </Route>
)

export default dashboard
