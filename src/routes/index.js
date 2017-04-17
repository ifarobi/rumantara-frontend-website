import React from 'react'

import { Route, IndexRoute } from 'react-router'

import Root from '../Root'

import Home from '../pages/Home'
import Login from '../pages/Login'

const routes = (
  <Route path="/" component={Root}>
    <IndexRoute component={Home} />
    <Route path="login" component={Login} />
  </Route>
)

export default routes
