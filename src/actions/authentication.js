import { push } from 'react-router-redux'
import axios from 'axios'
import {
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGOUT_USER,
  FETCH_PROTECTED_REQUEST,
  RECEIVE_PROTECTED_DATA,
} from '../constants/authentication'

const loginUserSuccess = (token, user) => {
  localStorage.setItem('access-token', token.accessToken)
  localStorage.setItem('refresh-token', token.refreshToken)
  return {
    type: LOGIN_USER_SUCCESS,
    payload: {
      token,
      user,
    },
  }
}

const loginUserFailure = (error) => {
  localStorage.removeItem('access-token')
  localStorage.removeItem('refresh-token')
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

const logoutAndRedirect = () => (dispatch, state) => {
  dispatch(logout())
  dispatch(push('/login'))
}

const loginUser = (email, password, redirect = '/') => (dispatch) => {
  dispatch(loginUserRequest())
  axios.post('http://128.199.231.246:8080/oauth/token', {
    'grant_type': 'password',
    'client_id': 2,
    'client_secret': 'v59h5S6EN0Lyiy93uM8MGVSXkwTRyZ3XcTyenCvo',
    'username': email,
    'password': password,
  })
  .then((response) => {
    console.log(response)
    dispatch(loginUserSuccess({
      accessToken: response.data.access_token,
      refreshToken: response.data.refresh_token,
    }, {
      email,
    }))
  })
  .catch((error) => {
    console.log(error)
    dispatch(loginUserFailure(error))
  })
}

const receiveProtectedData = (data) => {
  return {
    type: RECEIVE_PROTECTED_DATA,
    payload: {
      data,
    },
  }
}

const fetchProtectedDataRequest = () => ({
  type: FETCH_PROTECTED_REQUEST,
})

export {
  fetchProtectedDataRequest,
  receiveProtectedData,
  loginUser,
  loginUserRequest,
  loginUserFailure,
  loginUserSuccess,
  logout,
  logoutAndRedirect,
}
