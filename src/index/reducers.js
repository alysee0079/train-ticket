import {
  ACTION_SET_FROM,
  ACTION_SET_TO,
  ACTION_SET_ISCITYSELECTORVISIBLE,
  ACTION_SET_CURRENTSELECTINGLEFTCITY,
  ACTION_SET_CITYDATA,
  ACTION_SET_ISLOADINGCITYDATA,
  ACTION_SET_ISDATESELECTORVISIBLE,
  ACTION_SET_HIGHSPEED
} from './actions'

export default {
  from(state = '北京', action) {
    const { type, payload } = action
    switch (type) {
      case ACTION_SET_FROM:
        return payload
      default:
        return state
    }
  },
  to(state = '上海', action) {
    const { type, payload } = action
    switch (type) {
      case ACTION_SET_TO:
        return payload
      default:
        return state
    }
  },
  isCitySelectorVisible(state = false, action) {
    const { type, payload } = action
    switch (type) {
      case ACTION_SET_ISCITYSELECTORVISIBLE:
        return payload
      default:
        return state
    }
  },
  currentSelectingLeftCity(state = false, action) {
    const { type, payload } = action
    switch (type) {
      case ACTION_SET_CURRENTSELECTINGLEFTCITY:
        return payload
      default:
        return state
    }
  },
  cityData(state = null, action) {
    const { type, payload } = action
    switch (type) {
      case ACTION_SET_CITYDATA:
        return payload
      default:
        return state
    }
  },
  isLoadingCityData(state = false, action) {
    const { type, payload } = action
    switch (type) {
      case ACTION_SET_ISLOADINGCITYDATA:
        return payload
      default:
        return state
    }
  },
  isDateSelectorVisible(state = false, action) {
    const { type, payload } = action
    switch (type) {
      case ACTION_SET_ISDATESELECTORVISIBLE:
        return payload
      default:
        return state
    }
  },
  highSpeed(state = false, action) {
    const { type, payload } = action
    switch (type) {
      case ACTION_SET_HIGHSPEED:
        return payload
      default:
        return state
    }
  }
}
