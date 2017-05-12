import React from 'react'

import { Route, IndexRoute } from 'react-router'

import Dashboard from '../components/templates/Dashboard'
import Profile from '../pages/Dashboard/Profile'
import DashboardPage from '../pages/Dashboard/Dashboard'

const dashboard = (
  <Route path="dashboard" component={Dashboard}>
    <IndexRoute component={DashboardPage} />
    <Route path="profile" component={Profile} />
  </Route>
)

export default dashboard
