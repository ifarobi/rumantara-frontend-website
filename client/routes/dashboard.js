import React from 'react'

import { Route, IndexRoute } from 'react-router'

import Dashboard from '../components/templates/Dashboard'
import Profile from '../pages/Dashboard/Profile'
import Rooms from '../pages/Dashboard/Rooms'
import DashboardPage from '../pages/Dashboard/Dashboard'

import FormProfile from '../components/organisms/FormProfile'
import FormRoom from '../components/organisms/FormRoom'
import RoomListing from '../components/organisms/RoomListing'

const dashboard = (
  <Route path="dashboard" component={Dashboard}>
    <IndexRoute component={DashboardPage} />
    <Route path="profile" component={Profile}>
      <IndexRoute component={FormProfile} />
    </Route>
    <Route path="rooms" component={Rooms}>
      <IndexRoute component={RoomListing} />
      <Route path="new" component={FormRoom} />
      <Route path="edit/:id" component={FormRoom} />
    </Route>
  </Route>
)

export default dashboard
