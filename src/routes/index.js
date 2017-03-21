import React from 'react';

import {Route, IndexRoute} from 'react-router';

import Root from '../modules/Root';

import Home from '../modules/pages/Home';
import About from '../modules/pages/About';
import NotFound from '../modules/pages/NotFound';
import Login from '../modules/pages/Login';
import Register from '../modules/pages/Register';
import Host from '../modules/pages/Host';

const routes = (
  <Route path="/" component={Root}>
    <IndexRoute component={Home}/>
    <Route path="about" component={About}/>
    <Route path="host" component={Host}/>
    <Route path="login" component={Login}/>
    <Route path="register" component={Register}/>
    <Route path="*" component={NotFound}/>
  </Route>
)

export default routes;
