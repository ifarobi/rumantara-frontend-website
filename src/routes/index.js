import React from 'react'

import { Route, IndexRoute } from 'react-router'

import Root from '../Root'

import Home from '../pages/Home'
import About from '../pages/About'
import NotFound from '../pages/NotFound'
import Host from '../pages/Host'
import Login from '../pages/Login'

const routes = (
  <Route path="/" component={Root}>
    <IndexRoute component={Home} />
    <Route path="help" component={About} />
    <Route path="host" component={Host} />
    <Route path="login" component={Login} />
    <Route path="*" component={NotFound} />
  </Route>
)

export default routes
