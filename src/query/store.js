import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { h0 } from '../common/fp'
import { ORDER_DEPART } from './constant'

import reducers from './reducers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default createStore(
  combineReducers(reducers),
  {
    from: null,
    to: null,
    departDate: h0(Date.now()),
    highSpeed: false,
    trainList: [],
    orderType: ORDER_DEPART,
    onlyTickets: false,
    ticketTypes: [],
    checkedTicketTypes: {},
    trainTypes: [],
    checkedTrainTypes: {},
    departStations: [],
    checkedDepartStations: {},
    arriveStations: [],
    checkedArriveStations: {},
    departTimeStart: 0,
    departTimeEnd: 24,
    arriveTimeStart: 0,
    arriveTimeEnd: 24,
    isFiltersVisible: false,
    searchParsed: false
  },
  composeEnhancers(applyMiddleware(thunk))
)
