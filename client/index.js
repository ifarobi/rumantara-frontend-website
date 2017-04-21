import React from 'react'
import ReactDom from 'react-dom'

import { Provider } from 'react-redux'

import { Router, browserHistory, hashHistory } from 'react-router'

import { syncHistoryWithStore } from 'react-router-redux'

import routes from './routes'
import configureStore from '../common/store/configureStore'

let history = (Modernizr && Modernizr.history) ? browserHistory : hashHistory
const store = configureStore(history)
history = syncHistoryWithStore(history, store)

ReactDom.render(
  <Provider store={store}>
    <Router
      history={history}
      routes={routes}
    />
  </Provider>
, document.getElementById('root'))
