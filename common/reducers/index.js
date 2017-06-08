import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import auth from './authentication'
import request from './request'
import dialog from './dialog'

export default combineReducers({
  auth,
  request,
  dialog,
  routing,
})
