import { createReducer } from '../helpers/redux'
import {
  CHANGE_BALANCE,
} from '../constants/balance'

const initialState = {
  amount: 0
}

export default createReducer(initialState, {
  [CHANGE_BALANCE]: (state, payload) =>
    Object.assign({}, state, {
      amount: payload.amount
    })
})
