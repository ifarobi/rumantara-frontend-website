import {
  TOGGLE_DIALOG
} from '../constants/dialog'

const toggleDialog = () => {
  console.log("hmmmm")
  return ({
    type: TOGGLE_DIALOG
  })
}

export {
  toggleDialog,
}
