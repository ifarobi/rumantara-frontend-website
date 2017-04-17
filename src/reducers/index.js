import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import auth from './authentication'

export default combineReducers({
  auth,
  routing,
})
