import React from 'react'
import ReactDom from 'react-dom'
import cookie from 'react-cookie'

import { Provider } from 'react-redux'

import { Router, browserHistory, hashHistory } from 'react-router'

import { syncHistoryWithStore } from 'react-router-redux'
import axios from 'axios'
import config from 'config'
import routes from './routes'
import configureStore from '../common/store/configureStore'
import {
  AUTHENTICATED,
} from '../common/constants/authentication'
import {
  CHANGE_BALANCE,
} from '../common/constants/balance'

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
  axios.get(`${config.API_URL}/user-credits/${user.id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then((response) => {
    store.dispatch({
      type: CHANGE_BALANCE,
      payload: {
        amount: response.data.amount,
      },
    })
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
