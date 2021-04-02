import React, { memo, useCallback, useMemo } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import './App.css'

import Header from '../common/Header'
import DepartDate from './DepartDate'
import HighSpeed from './HighSpeed'
import Journey from './Journey'
import Submit from './Submit'
import CitySelector from '../common/CitySelector'
import DateSelector from '../common/DateSelector'

import {
  exchangeFromTo,
  showCitySelector,
  hideCitySelector,
  fetchCityData,
  setSelectorCity,
  showDateSelector,
  hideDateSelector,
  setDepartDate,
  toggleHighSpeed
} from './actions'
import { h0 } from '../common/fp'

const App = memo(function(props) {
  const {
    from,
    to,
    dispatch,
    isCitySelectorVisible,
    cityData,
    isLoadingCityData,
    departDate,
    isDateSelectorVisible,
    highSpeed
  } = props
  const onBack = useCallback(() => {
    window.history.back()
  }, [])
  // const doExchangeFromTo = useCallback(() => {
  //   dispatch(exchangeFromTo())
  // }, [])
  // const doShowCitySelector = useCallback(m => {
  //   dispatch(showCitySelector(m))
  // }, [])
  const cbs = useMemo(() => {
    return bindActionCreators(
      {
        exchangeFromTo,
        showCitySelector
      },
      dispatch
    )
  }, [])
  const citySelectorCbs = useMemo(() => {
    return bindActionCreators(
      {
        onBack: hideCitySelector,
        fetchCityData,
        onSelect: setSelectorCity
      },
      dispatch
    )
  }, [])
  const departDateCbs = useMemo(() => {
    return bindActionCreators(
      {
        onClick: showDateSelector
      },
      dispatch
    )
  }, [])
  const dateSelectorCbs = useMemo(() => {
    return bindActionCreators(
      {
        onBack: hideDateSelector
      },
      dispatch
    )
  }, [])
  const highSpeedCbs = useMemo(() => {
    return bindActionCreators({ toggle: toggleHighSpeed }, dispatch)
  }, [])

  const onSelectDate = useCallback(day => {
    if (!day || day < h0()) return
    dispatch(setDepartDate(day))
    dispatch(hideDateSelector())
  }, [])

  return (
    <>
      <div className="header-wrapper">
        <Header title="title" onBack={onBack} />
      </div>
      <form action="./query.html" className="form">
        <Journey
          from={from}
          to={to}
          {...cbs}
          // exchangeFromTo={doExchangeFromTo}
          // showCitySelector={doShowCitySelector}
        />
        <DepartDate time={departDate} {...departDateCbs} />
        <HighSpeed highSpeed={highSpeed} {...highSpeedCbs} />
        <Submit />
      </form>
      <CitySelector
        show={isCitySelectorVisible}
        cityData={cityData}
        isLoading={isLoadingCityData}
        {...citySelectorCbs}
      />
      <DateSelector
        show={isDateSelectorVisible}
        {...dateSelectorCbs}
        onSelect={onSelectDate}
      />
    </>
  )
})

const mapStateToProps = state => {
  return state
}

const mapDispatchToProps = dispatch => {
  return { dispatch }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
