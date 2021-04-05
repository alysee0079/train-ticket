import React, { memo, useEffect, useMemo, useState, useRef } from 'react'
import leftPad from 'left-pad'
import './Slider.css'
import useWinSize from '../common/useWinSize'

export default memo(function Slider(props) {
  const {
    title,
    currentStartHours,
    currentEndHours,
    onStartChanged,
    onEndChanged
  } = props
  const [start, setStart] = useState(() => (currentStartHours / 24) * 100)
  const [end, setEnd] = useState(() => (currentEndHours / 24) * 100)
  const startHandle = useRef()
  const endHandle = useRef()
  const lastStartX = useRef()
  const lastEndX = useRef()
  const range = useRef()
  const rangeWidth = useRef()
  const winSize = useWinSize()

  const startPercent = useMemo(() => {
    if (start > 100) return 100
    if (start < 0) return 0
    return start
  }, [start])
  const endPercent = useMemo(() => {
    if (end > 100) return 100
    if (end < 0) return 0
    return end
  }, [end])

  const startHours = useMemo(() => {
    return Math.round((startPercent * 24) / 100)
  }, [startPercent])
  const endHours = useMemo(() => {
    return Math.round((endPercent * 24) / 100)
  }, [endPercent])

  const startText = useMemo(() => {
    return leftPad(startHours, 2, '0') + ':00'
  }, [startHours])
  const endText = useMemo(() => {
    return leftPad(endHours, 2, '0') + ':00'
  }, [endHours])

  const onStartTouchBegin = e => {
    const touch = e.targetTouches[0]
    lastStartX.current = touch.pageX
  }
  const onEndTouchBegin = e => {
    const touch = e.targetTouches[0]
    lastEndX.current = touch.pageX
  }

  const onStartTouchMove = e => {
    const touch = e.targetTouches[0]
    const distance = touch.pageX - lastStartX.current
    lastStartX.current = touch.pageX
    setStart(start => start + (distance / rangeWidth.current) * 100)
  }
  const onEndTouchMove = e => {
    const touch = e.targetTouches[0]
    const distance = touch.pageX - lastEndX.current
    lastEndX.current = touch.pageX
    setEnd(end => end + (distance / rangeWidth.current) * 100)
  }

  useEffect(() => {
    rangeWidth.current = parseFloat(
      window.getComputedStyle(range.current).width
    )
  }, [winSize.width, winSize.height])

  useEffect(() => {
    startHandle.current.addEventListener('touchstart', onStartTouchBegin, false)
    startHandle.current.addEventListener('touchmove', onStartTouchMove, false)
    endHandle.current.addEventListener('touchstart', onEndTouchBegin, false)
    endHandle.current.addEventListener('touchmove', onEndTouchMove, false)

    return () => {
      startHandle.current.removeEventListener(
        'touchstart',
        onStartTouchBegin,
        false
      )
      startHandle.current.removeEventListener(
        'touchmove',
        onStartTouchMove,
        false
      )
      endHandle.current.removeEventListener(
        'touchstart',
        onEndTouchBegin,
        false
      )
      endHandle.current.removeEventListener('touchmove', onEndTouchMove, false)
    }
  })

  useEffect(() => {
    onStartChanged(startHours)
  }, [startHours])
  useEffect(() => {
    onEndChanged(endHours)
  }, [endHours])

  return (
    <div className="option">
      <h3>{title}</h3>
      <div className="range-slider">
        <div className="slider" ref={range}>
          <div
            className="slider-rang"
            style={{
              left: startPercent + '%',
              width: endPercent - startPercent + '%'
            }}
          ></div>
          <i
            ref={startHandle}
            className="slider-handle"
            style={{
              left: startPercent + '%'
            }}
          >
            <span>{startText}</span>
          </i>
          <i
            ref={endHandle}
            className="slider-handle"
            style={{
              left: endPercent + '%'
            }}
          >
            <span>{endText}</span>
          </i>
        </div>
      </div>
    </div>
  )
})
