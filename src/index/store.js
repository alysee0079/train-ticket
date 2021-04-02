import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import reducers from './reducers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default createStore(
  combineReducers(reducers),
  {
    from: '北京',
    to: '上海',
    isCitySelectorVisible: false,
    currentSelectingLeftCity: false,
    cityData: null,
    departDate: Date.now(),
    isLoadingCityData: false,
    isDateSelectorVisible: false,
    highSpeed: false
  },
  composeEnhancers(applyMiddleware(thunk))
)
