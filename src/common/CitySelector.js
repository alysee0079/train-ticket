import React, { memo, useState, useMemo, useEffect, useCallback } from 'react'
import classnames from 'classnames'

import './CitySelector.css'

const CityItem = memo(function(props) {
  const { name, onSelect } = props
  return (
    <li className="city-li" onClick={() => onSelect(name)}>
      {name}
    </li>
  )
})

const CitySection = memo(function(props) {
  const { title, cities = [], onSelect } = props
  return (
    <ul className="city-ul">
      <li className="city-li" key="title" data-cate={title}>
        {title}
      </li>
      {cities.map(item => {
        return <CityItem key={item.name} name={item.name} onSelect={onSelect} />
      })}
    </ul>
  )
})

const AlphaIndex = memo(function(props) {
  const { alpha, onClick } = props
  return (
    <i className="city-index-item" onClick={() => onClick(alpha)}>
      {alpha}
    </i>
  )
})

const alphabet = Array.from(new Array(26), (el, index) => {
  return String.fromCharCode(65 + index)
})

const CityList = memo(function(props) {
  const { sections, onSelect, toAlpha } = props
  return (
    <div className="city-list">
      <div className="city-cate">
        {sections.map(item => {
          return (
            <CitySection
              key={item.title}
              title={item.title}
              cities={item.citys}
              onSelect={onSelect}
            />
          )
        })}
      </div>
      <div className="city-index">
        {alphabet.map(item => {
          return <AlphaIndex key={item} alpha={item} onClick={toAlpha} />
        })}
      </div>
    </div>
  )
})

// 搜素结果内容列表
const SuggestItem = memo(function(props) {
  const { name, onClick } = props
  return (
    <li className="city-suggest-li" onClick={() => onClick(name)}>
      {name}
    </li>
  )
})

// 搜索结果内容 wrapper
const Suggest = memo(function(props) {
  const { searchKey, onSelect } = props
  const [result, setResult] = useState([])

  useEffect(() => {
    fetch('/rest/search?key=' + encodeURIComponent(searchKey))
      .then(res => res.json())
      .then(data => {
        const { result, searchKey: sKey } = data
        if (sKey === searchKey) {
          setResult(result)
        }
      })
  }, [searchKey])

  const fallBackResult = useMemo(() => {
    if (!result.length) {
      return [{ display: searchKey }]
    }
    return result
  }, [result, searchKey])

  return (
    <div className="city-suggest">
      <ul className="city-suggest-ul">
        {fallBackResult.map(item => {
          return (
            <SuggestItem
              key={item.display}
              name={item.display}
              onClick={onSelect}
            />
          )
        })}
      </ul>
    </div>
  )
})

export default memo(function CitySelector(props) {
  const { show, cityData, isLoading, onBack, fetchCityData, onSelect } = props
  const [searchKey, setSearchKey] = useState('')

  useEffect(() => {
    if (!show || cityData || isLoading) return
    fetchCityData()
  }, [show])

  const key = useMemo(() => searchKey.trim(), [searchKey])

  const toAlpha = useCallback(alpha => {
    document.querySelector(`[data-cate='${alpha}']`).scrollIntoView({
      behavior: 'smooth'
    })
  }, [])

  return (
    <div className={classnames('city-selector', { hidden: !show })}>
      <div className="city-search">
        <div className="search-back" onClick={onBack}>
          <svg width="42" height="42">
            <polyline
              points="25,13 16,21 25,29"
              stroke="#fff"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>
        <div className="search-input-wrapper">
          <input
            type="text"
            value={searchKey}
            onChange={e => setSearchKey(e.target.value)}
            className="search-input"
            placeholder="城市、车站的中文或者拼音"
          />
        </div>
        <i
          className={classnames('search-clean', { hidden: !key.length })}
          onClick={() => setSearchKey('')}
        >
          &#xf063;
        </i>
      </div>
      {key && <Suggest searchKey={key} onSelect={() => onSelect(key)} />}
      {cityData && (
        <CityList
          sections={cityData.cityList}
          onSelect={onSelect}
          toAlpha={toAlpha}
        />
      )}
    </div>
  )
})
