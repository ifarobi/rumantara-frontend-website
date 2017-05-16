import React from 'react'

import { Route, IndexRoute } from 'react-router'

import Dashboard from '../components/templates/Dashboard'
import Profile from '../pages/Dashboard/Profile'
import Rooms from '../pages/Dashboard/Rooms'
import DashboardPage from '../pages/Dashboard/Dashboard'

import FormAddRoom from '../components/organisms/FormAddRoom'

const dashboard = (
  <Route path="dashboard" component={Dashboard}>
    <IndexRoute component={DashboardPage} />
    <Route path="profile" component={Profile} />
    <Route path="rooms" component={Rooms}>
      <Route path="new" component={FormAddRoom} />
    </Route>
  </Route>
)

export default dashboard
