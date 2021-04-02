import React, { memo } from 'react'
import classnames from 'classnames'
import './HighSpeed.css'

export default memo(function HighSpeed(props) {
  const { highSpeed, toggle } = props
  console.log(highSpeed)
  return (
    <div className="high-speed">
      <div className="high-speed-label">只看高铁/动车</div>
      <div className="high-speed-switch" onClick={toggle}>
        <input type="hidden" name="highSpeed" value={highSpeed} />
        <div
          className={classnames('high-speed-track', {
            checked: highSpeed
          })}
        >
          <span
            className={classnames('high-speed-handle', {
              checked: highSpeed
            })}
          ></span>
        </div>
      </div>
    </div>
  )
})
