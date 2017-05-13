import { push } from 'react-router-redux'
import axios from 'axios'
import cookie from 'react-cookie'
import config from 'config'

import {
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGOUT_USER,
  UPDATE_USER,
} from '../constants/authentication'

const loginUserSuccess = (token, user) => {
  cookie.save('access-token', token.accessToken)
  cookie.save('refresh-token', token.refreshToken)
  cookie.save('user', user)
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
  cookie.remove('user')
  return {
    type: LOGIN_USER_FAILURE,
    payload: {
      type: error.error,
      message: error.message,
    },
  }
}

const updateUser = (user) => {
  cookie.save('user', user)
  return {
    type: UPDATE_USER,
    payload: {
      user
    }
  }
}

const loginUserRequest = () => {
  console.log(LOGIN_USER_REQUEST)
  return {
    type: LOGIN_USER_REQUEST,
  }
}

const logout = () => {
  cookie.remove('access-token')
  cookie.remove('refresh-token')
  cookie.remove('user')
  return {
    type: LOGOUT_USER,
  }
}

const logoutAndRedirect = (redirect = '/') => (dispatch) => {
  dispatch(logout())
  dispatch(push(redirect))
}

const getUserDetail = (token, email, redirect) => (dispatch) => {
  axios.get(
    `${config.API_URL}/users/get-by-email/${email}`,
    {
      headers: {
        Authorization: `Bearer ${token.access_token}`
      }
    }
  )
  .then((response) => {
    dispatch(loginUserSuccess({
      accessToken: token.access_token,
      refreshToken: token.refresh_token,
    }, response.data.data))
    dispatch(push(redirect))
  })
  .catch((error) => {
    console.log(error)
    dispatch(loginUserFailure(error))
  })
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
    getUserDetail(response.data, email, redirect)(dispatch)
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
  updateUser,
}
