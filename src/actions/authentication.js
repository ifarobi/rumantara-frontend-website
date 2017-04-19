import { push } from 'react-router-redux'
import axios from 'axios'
import cookie from 'react-cookie'
import config from 'config'

import {
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGOUT_USER,
} from '../constants/authentication'

const loginUserSuccess = (token, user) => {
  cookie.save('access-token', token.accessToken)
  cookie.save('refresh-token', token.refreshToken)
  return {
    type: LOGIN_USER_SUCCESS,
    payload: {
      token,
      user,
    },
  }
}

const loginUserFailure = (error) => {
  cookie.remove('access-token')
  cookie.remove('refresh-token')
  return {
    type: LOGIN_USER_FAILURE,
    payload: {
      type: error.error,
      message: error.message,
    },
  }
}

const loginUserRequest = () => {
  console.log(LOGIN_USER_REQUEST)
  return {
    type: LOGIN_USER_REQUEST,
  }
}

const logout = () => {
  localStorage.removeItem('access-token')
  return {
    type: LOGOUT_USER,
  }
}

const logoutAndRedirect = (redirect = '/login') => (dispatch) => {
  dispatch(logout())
  dispatch(push(redirect))
}

const loginUser = (email, password, redirect = '/') => (dispatch) => {
  dispatch(loginUserRequest())
  axios.post(`${config.ROOT_URL}/oauth/token`, {
    'grant_type': 'password',
    'client_id': 2,
    'client_secret': config.CLIENT_SECRET,
    'username': email,
    'password': password,
  })
  .then((response) => {
    dispatch(loginUserSuccess({
      accessToken: response.data.access_token,
      refreshToken: response.data.refresh_token,
    }, {
      email,
    }))
    dispatch(push(redirect))
  })
  .catch((error) => {
    console.log(error)
    dispatch(loginUserFailure(error))
  })
}

export {
  loginUser,
  loginUserRequest,
  loginUserFailure,
  loginUserSuccess,
  logout,
  logoutAndRedirect,
}
