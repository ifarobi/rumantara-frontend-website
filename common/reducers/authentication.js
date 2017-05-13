import { createReducer } from '../helpers/redux'
import {
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGOUT_USER,
  AUTHENTICATED,
  UPDATE_USER,
} from '../constants/authentication'

const initialState = {
  token: null,
  user: null,
  isAuthenticated: false,
  isAuthenticating: false,
  statusText: null,
}

export default createReducer(initialState, {
  [LOGIN_USER_REQUEST]: state =>
    Object.assign({}, state, {
      isAuthenticating: true,
      statusText: null,
    }),
  [LOGIN_USER_SUCCESS]: (state, payload) =>
    Object.assign({}, state, {
      user: payload.user,
      isAuthenticating: false,
      isAuthenticated: true,
      token: payload.token,
      statusText: 'You have been successfully logged in.',
    }),
  [LOGIN_USER_FAILURE]: (state, payload) =>
    Object.assign({}, state, {
      user: null,
      isAuthenticating: false,
      isAuthenticated: false,
      token: null,
      statusText: `Authentication Error: [${payload.status}] ${payload.statusText}`,
    }),
  [LOGOUT_USER]: state =>
    Object.assign({}, state, {
      isAuthenticated: false,
      token: null,
      user: null,
      statusText: 'You have been successfully logged out.',
    }),
  [AUTHENTICATED]: (state, payload) =>
    Object.assign({}, state, {
      user: payload.user,
      isAuthenticating: false,
      isAuthenticated: true,
      token: payload.token,
      statusText: 'You have been successfully logged in.',
    }),
  [UPDATE_USER]: (state, payload) =>
    Object.assign({}, state, {
      user: payload.user,
      statusText: 'You update your profile',
    }),
})
