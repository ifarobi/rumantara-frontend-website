import React from 'react'
import ReactDom from 'react-dom'
import cookie from 'react-cookie'

import { Provider } from 'react-redux'

import { Router, browserHistory, hashHistory } from 'react-router'

import { syncHistoryWithStore } from 'react-router-redux'

import routes from './routes'
import configureStore from '../common/store/configureStore'
import {
  AUTHENTICATED,
} from '../common/constants/authentication'

let history = (Modernizr && Modernizr.history) ? browserHistory : hashHistory
const store = configureStore(history)
history = syncHistoryWithStore(history, store)

const token = cookie.load('access-token')
if (token) {
  const user = cookie.load('user')
  const refreshToken = cookie.load('refresh-token')
  store.dispatch({
    type: AUTHENTICATED,
    payload: {
      token: {
        accessToken: token,
        refreshToken,
      },
      user,
    },
  })
}

ReactDom.render(
  <Provider store={store}>
    <Router
      history={history}
      routes={routes}
    />
  </Provider>
, document.getElementById('root'))
