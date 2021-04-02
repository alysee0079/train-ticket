import React, { memo } from 'react'
import './Journey.css'
const Switch = require('./imgs/switch.svg')

export default memo(function Journey(props) {
  const { from, to, exchangeFromTo, showCitySelector } = props

  return (
    <div className="journey">
      <div className="journey-station" onClick={() => showCitySelector(true)}>
        <input
          className="journey-input journey-from"
          type="text"
          readOnly
          name="from"
          value={from}
        />
      </div>
      <div className="journey-switch">
        <img
          src={Switch}
          alt=""
          width="70"
          height="40"
          onClick={exchangeFromTo}
        />
      </div>
      <div className="journey-station">
        <input
          className="journey-input journey-to"
          type="text"
          readOnly
          name="to"
          value={to}
        />
      </div>
    </div>
  )
})
