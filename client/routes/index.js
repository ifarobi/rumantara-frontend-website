import React from 'react'

import { Route, IndexRoute } from 'react-router'

import Root from '../Root'

import Home from '../pages/Home'
import Login from '../pages/Login'
import Logout from '../pages/Logout'
import Register from '../pages/Register'
import Detail from '../pages/Rooms/Detail'

const routes = (
  <Route path="/" component={Root}>
    <IndexRoute component={Home} />
    <Route path="login" component={Login} />
    <Route path="logout" component={Logout} />
    <Route path="register" component={Register} />
    <Route path="room/:id" component={Detail} />
  </Route>
)

export default routes
