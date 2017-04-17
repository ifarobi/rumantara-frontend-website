import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { routerMiddleware } from 'react-router-redux'
import rootReducer from '../reducers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const configureStore = (history, preloadedState) => createStore(
  rootReducer,
  preloadedState,
  composeEnhancers(
    applyMiddleware(thunk, routerMiddleware(history)),
  ),
)

export default configureStore
