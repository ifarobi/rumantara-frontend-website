import { createReducer } from '../helpers/redux'
import { TOGGLE_DIALOG } from '../constants/dialog'

const initialState = {
  isDialogActive: false,
}

export default createReducer(initialState, {
  [TOGGLE_DIALOG]: state =>
    Object.assign({}, state, {
      isDialogActive: !state.isDialogActive
    })
})
