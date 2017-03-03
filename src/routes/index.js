import React from 'react';

import {Route, IndexRoute} from 'react-router';

import App from '../components/App';

import Home from '../components/pages/Home';
import About from '../components/pages/About';
import NotFound from '../components/pages/NotFound';
import Login from '../components/pages/Login';
import Register from '../components/pages/Register';
import Host from '../components/pages/Host';

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path="about" component={About}/>
    <Route path="host" component={Host}/>
    <Route path="login" component={Login}/>
    <Route path="register" component={Register}/>
    <Route path="*" component={NotFound}/>
  </Route>
)

export default routes;
