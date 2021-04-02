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

import {
  exchangeFromTo,
  showCitySelector,
  hideCitySelector,
  fetchCityData,
  setSelectorCity
} from './actions'

const App = memo(function(props) {
  const {
    from,
    to,
    dispatch,
    isCitySelectorVisible,
    cityData,
    isLoadingCityData
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

  return (
    <>
      <div className="header-wrapper">
        <Header title="title" onBack={onBack} />
      </div>
      <form action="" className="form">
        <Journey
          from={from}
          to={to}
          {...cbs}
          // exchangeFromTo={doExchangeFromTo}
          // showCitySelector={doShowCitySelector}
        />
        <DepartDate />
        <HighSpeed />
        <Submit />
      </form>
      <CitySelector
        show={isCitySelectorVisible}
        cityData={cityData}
        isLoading={isLoadingCityData}
        {...citySelectorCbs}
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
