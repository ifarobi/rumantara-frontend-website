import React from 'react';
import ReactDom from 'react-dom';
import path from 'path';

import {Router, browserHistory, hashHistory} from 'react-router';

import routes from './routes';
console.log(routes);
let history = (Modernizr && Modernizr.history) ? browserHistory : hashHistory;

global.SRCDIR = path.resolve(__dirname);

ReactDom.render(
  <Router
    history={history}
    routes={routes}
  />
  , document.getElementById('root'));
