export const ACTION_SET_FROM = 'SET_FROM'
export const ACTION_SET_TO = 'SET_TO'
export const ACTION_SET_ISCITYSELECTORVISIBLE = 'SET_ISCITYSELECTORVISIBLE'
export const ACTION_SET_CURRENTSELECTINGLEFTCITY =
  'SET_CURRENTSELECTINGLEFTCITY'
export const ACTION_SET_CITYDATA = 'SET_CITYDATA'
export const ACTION_SET_ISLOADINGCITYDATA = 'SET_ISLOADINGCITYDATA'
export const ACTION_SET_ISDATESELECTORVISIBLE = 'SET_ISDATESELECTORVISIBLE'
export const ACTION_SET_HIGHSPEED = 'SET_HIGHSPEED'
export const ACTION_SET_DEPART_DATE = 'SET_DEPART_DATE'

export const setFrom = from => {
  return {
    type: ACTION_SET_FROM,
    payload: from
  }
}

export const setTo = to => {
  return {
    type: ACTION_SET_TO,
    payload: to
  }
}

export const setCityData = cityData => {
  return {
    type: ACTION_SET_CITYDATA,
    payload: cityData
  }
}

export const setIsLoadingCityData = isLoadingCityData => {
  return {
    type: ACTION_SET_ISLOADINGCITYDATA,
    payload: isLoadingCityData
  }
}

export const setIsDateSelectorVisible = isDateSelectorVisible => {
  return {
    type: ACTION_SET_ISDATESELECTORVISIBLE,
    payload: isDateSelectorVisible
  }
}

export const toggleHighSpeed = () => {
  return (dispatch, getState) => {
    const { highSpeed } = getState()
    dispatch({
      type: ACTION_SET_HIGHSPEED,
      payload: !highSpeed
    })
  }
}

// 打开城市选择框，并显示当前选择的城市
export const showCitySelector = currentSelectingLeftCity => {
  return dispatch => {
    dispatch({
      type: ACTION_SET_ISCITYSELECTORVISIBLE,
      payload: true
    })
    dispatch({
      type: ACTION_SET_CURRENTSELECTINGLEFTCITY,
      payload: currentSelectingLeftCity
    })
  }
}

// 隐藏城市选择框
export const hideCitySelector = () => {
  return {
    type: ACTION_SET_ISCITYSELECTORVISIBLE,
    payload: false
  }
}

// 选择城市
export const setSelectorCity = city => {
  return (dispatch, getState) => {
    const { currentSelectingLeftCity } = getState()
    if (currentSelectingLeftCity) {
      dispatch(setFrom(city))
    } else {
      dispatch(setTo(city))
    }
    dispatch(hideCitySelector())
  }
}

export const showDateSelector = () => {
  return {
    type: ACTION_SET_ISDATESELECTORVISIBLE,
    payload: true
  }
}

export const hideDateSelector = () => {
  return {
    type: ACTION_SET_ISDATESELECTORVISIBLE,
    payload: false
  }
}

export const exchangeFromTo = () => {
  return (dispatch, getState) => {
    const { from, to } = getState()
    dispatch(setFrom(to))
    dispatch(setTo(from))
  }
}

// 获取城市数据
export const fetchCityData = () => {
  return (dispatch, getState) => {
    const { isLoadingCityData } = getState()
    if (isLoadingCityData) return
    const cache = JSON.parse(sessionStorage.getItem('city_data_cache') || '{}')
    if (Date.now() < cache.expires) {
      dispatch(setCityData(cache.data))
      return
    }
    dispatch(setIsLoadingCityData(true))
    fetch('/rest/cities?_' + Date.now())
      .then(res => res.json())
      .then(data => {
        dispatch(setCityData(data))
        sessionStorage.setItem(
          'city_data_cache',
          JSON.stringify({
            expires: Date.now() + 60 * 1000,
            data
          })
        )
        dispatch(setIsLoadingCityData(false))
      })
      .catch(() => {
        dispatch(setIsLoadingCityData(false))
      })
  }
}

export function setDepartDate(departDate) {
  return {
    type: ACTION_SET_DEPART_DATE,
    payload: departDate
  }
}
