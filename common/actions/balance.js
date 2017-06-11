import axios from 'axios'
import config from 'config'
import cookie from 'react-cookie'

import {
  CHANGE_BALANCE
} from '../constants/balance'

const changeBalance = (amount) => {
  return {
    type: CHANGE_BALANCE,
    payload: {
      amount,
    }
  }
}

const reinitBalance = userId => dispatch => {
  console.log(userId)
  const token = cookie.load('access-token')
  axios.get(`${config.API_URL}/user-credits/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  .then((response) => {
    dispatch(changeBalance(response.data.amount))
  })
}

export {
  reinitBalance,
}
