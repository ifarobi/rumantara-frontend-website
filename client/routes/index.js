import React from 'react'

import { Route, IndexRoute } from 'react-router'

import Root from '../Root'

import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'

const routes = (
  <Route path="/" component={Root}>
    <IndexRoute component={Home} />
    <Route path="login" component={Login} />
    <Route path="register" component={Register} />
  </Route>
)

export default routes
