import { createReducer } from '../helpers/redux'
import {
  REQUEST_DONE,
  REQUEST_PROGRESS
} from '../constants/request'

const initialState = {
  isProgress: false,
  statusCode: null,
  statusText: null,
}

export default createReducer(initialState, {
  [REQUEST_PROGRESS]: state =>
    Object.assign({}, state, {
      isProgress: true,
      statusCode: null,
      statusText: null,
    }),
  [REQUEST_DONE]: (state, payload) =>
    Object.assign({}, state, {
      isProgress: false,
      statusCode: payload.statusCode,
      statusText: payload.statustext,
    })
})
