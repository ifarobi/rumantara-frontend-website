import React from 'react'

import { Route, IndexRoute } from 'react-router'

import Root from '../Root'

import Home from '../pages/Home'
import About from '../pages/About'
import NotFound from '../pages/NotFound'
import Host from '../pages/Host'

const routes = (
  <Route path="/" component={Root}>
    <IndexRoute component={Home} />
    <Route path="help" component={About} />
    <Route path="host" component={Host} />
    <Route path="*" component={NotFound} />
  </Route>
)

export default routes
