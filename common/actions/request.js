import {
  REQUEST_DONE,
  REQUEST_PROGRESS,
} from '../constants/request'

const requestProgress = () => ({
  type: REQUEST_PROGRESS,
})

const requestDone = (statusCode, statusText) => ({
  type: REQUEST_DONE,
  payload: {
    statusCode,
    statusText,
  },
})

export {
  requestProgress,
  requestDone,
}
