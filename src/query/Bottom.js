import classNames from 'classnames'
import React, { memo, useCallback, useState } from 'react'
import './Bottom.css'
import { ORDER_DEPART } from './constant'
import Slider from './Slider'

const Filter = memo(props => {
  const { name, checked, toggle, value } = props

  return (
    <li
      className={classNames({
        checked
      })}
      onClick={() => toggle(value)}
    >
      {name}
    </li>
  )
})

const Option = memo(props => {
  const { title, options, checkedMap, update } = props

  const toggle = useCallback(
    value => {
      const newCheckedMap = { ...checkedMap }
      if (value in checkedMap) {
        delete newCheckedMap[value]
      } else {
        newCheckedMap[value] = true
      }
      update(newCheckedMap)
    },
    [checkedMap, update]
  )
  return (
    <div className="option">
      <h3>{title}</h3>
      <ul>
        {options.map(item => {
          return (
            <Filter
              key={item.value}
              {...item}
              checked={item.value in checkedMap}
              toggle={toggle}
            />
          )
        })}
      </ul>
    </div>
  )
})

const BottomModal = memo(props => {
  const {
    checkedTicketTypes,
    checkedTrainTypes,
    checkedDepartStations,
    checkedArriveStations,
    departTimeStart,
    departTimeEnd,
    arriveTimeStart,
    arriveTimeEnd,
    ticketTypes,
    trainTypes,
    departStations,
    arriveStations,
    setCheckedTicketTypes,
    setCheckedTrainTypes,
    setCheckedDepartStations,
    setCheckedArriveStations,
    setDepartTimeEnd,
    setDepartTimeStart,
    setArriveTimeEnd,
    setArriveTimeStar,
    toggleIsFiltersVisible
  } = props
  const [localCheckedTicketTypes, setLocalCheckedTicketTypes] = useState(
    () => ({
      ...checkedTicketTypes
    })
  )
  const [localCheckedTrainTypes, setLocalCheckedTrainTypes] = useState(() => ({
    ...checkedTrainTypes
  }))
  const [localCheckedDepartStations, setLocalCheckedDepartStations] = useState(
    () => ({
      ...checkedDepartStations
    })
  )
  const [localCheckedArriveStations, setLocalCheckedArriveStations] = useState(
    () => ({
      ...checkedArriveStations
    })
  )
  const [localDepartTimeStart, setLocalDepartTimeStart] = useState(
    departTimeStart
  )
  const [localDepartTimeEnd, setLocalDepartTimeEnd] = useState(departTimeEnd)
  const [localArriveTimeStart, setLocalArriveTimeStart] = useState(
    arriveTimeStart
  )
  const [localArriveTimeEnd, setLocalArriveTimeEnd] = useState(arriveTimeEnd)

  const optionGroup = [
    {
      title: '坐席类型',
      options: ticketTypes,
      checkedMap: localCheckedTicketTypes,
      update: setLocalCheckedTicketTypes // 更新组件内数据
    },
    {
      title: '车次类型',
      options: trainTypes,
      checkedMap: localCheckedTrainTypes,
      update: setLocalCheckedTrainTypes
    },
    {
      title: '出发车展',
      options: departStations,
      checkedMap: localCheckedDepartStations,
      update: setLocalCheckedDepartStations
    },
    {
      title: '到达车站',
      options: arriveStations,
      checkedMap: localCheckedArriveStations,
      update: setLocalCheckedArriveStations
    }
  ]

  const sure = () => {
    setCheckedTicketTypes(localCheckedTicketTypes)
    setCheckedTrainTypes(localCheckedTrainTypes)
    setCheckedDepartStations(localCheckedDepartStations)
    setLocalCheckedArriveStations(localCheckedArriveStations)

    setDepartTimeStart(localDepartTimeStart)
    setDepartTimeEnd(localDepartTimeEnd)

    setArriveTimeStar(localArriveTimeStart)
    setArriveTimeEnd(localArriveTimeEnd)

    toggleIsFiltersVisible()
  }

  const reset = () => {
    setCheckedTicketTypes({})
    setCheckedTrainTypes({})
    setCheckedDepartStations({})
    setLocalCheckedArriveStations({})

    setDepartTimeStart(0)
    setDepartTimeEnd(24)

    setArriveTimeStar(0)
    setArriveTimeEnd(24)

    toggleIsFiltersVisible()
  }

  return (
    <div className="bottom-modal">
      <div className="bottom-dialog">
        <div className="bottom-dialog-content">
          <div className="title">
            <span className="reset" onClick={reset}>
              重置
            </span>
            <span className="ok" onClick={sure}>
              确定
            </span>
          </div>
          <div className="options">
            {optionGroup.map(group => {
              return <Option {...group} key={group.title} />
            })}
          </div>
          <Slider
            title="出发时间"
            currentStartHours={localDepartTimeStart}
            currentEndHours={localDepartTimeEnd}
            onStartChanged={setLocalDepartTimeStart}
            onEndChanged={setLocalDepartTimeEnd}
          />
          <Slider
            title="到达时间"
            currentStartHours={localArriveTimeStart}
            currentEndHours={localArriveTimeEnd}
            onStartChanged={setLocalArriveTimeStart}
            onEndChanged={setLocalArriveTimeEnd}
          />
        </div>
      </div>
    </div>
  )
})

export default memo(function Bottom(props) {
  const {
    highSpeed,
    orderType,
    onlyTickets,
    isFiltersVisible,
    toggleHighSpeed,
    toggleIsFiltersVisible,
    toggleOnlyTickets,
    toggleOrderType,
    checkedTicketTypes,
    checkedTrainTypes,
    checkedDepartStations,
    checkedArriveStations,
    departTimeStart,
    departTimeEnd,
    arriveTimeStart,
    arriveTimeEnd,
    ticketTypes,
    trainTypes,
    departStations,
    arriveStations,
    setCheckedTicketTypes,
    setCheckedTrainTypes,
    setCheckedDepartStations,
    setCheckedArriveStations,
    setDepartTimeEnd,
    setDepartTimeStart,
    setArriveTimeEnd,
    setArriveTimeStart
  } = props

  return (
    <div className="bottom">
      <div className="bottom-filters">
        <span className="item" onClick={toggleOrderType}>
          <i className="icon">&#xf065;</i>
          {orderType === ORDER_DEPART ? '出发 早->晚' : '耗时 短->长'}
        </span>
        <span
          className={classNames('item', {
            'item-on': highSpeed
          })}
          onClick={toggleHighSpeed}
        >
          <i className="icon">{highSpeed ? '\uf43f' : '\uf43e'}</i>
          只看高铁动车
        </span>
        <span
          className={classNames('item', {
            'item-on': onlyTickets
          })}
          onClick={toggleOnlyTickets}
        >
          <i className="icon">{highSpeed ? '\uf43d' : '\uf43c'}</i>
          只看有票
        </span>
        <span
          className={classNames('item', {
            'item-on': isFiltersVisible
          })}
          onClick={toggleIsFiltersVisible}
        >
          <i className="icon">{'\uf0f7'}</i>
          综合筛选
        </span>
      </div>
      {isFiltersVisible && (
        <BottomModal
          checkedTicketTypes={checkedTicketTypes}
          checkedTrainTypes={checkedTrainTypes}
          checkedDepartStations={checkedDepartStations}
          checkedArriveStations={checkedArriveStations}
          departTimeStart={departTimeStart}
          departTimeEnd={departTimeEnd}
          arriveTimeStart={arriveTimeStart}
          arriveTimeEnd={arriveTimeEnd}
          ticketTypes={ticketTypes}
          trainTypes={trainTypes}
          departStations={departStations}
          arriveStations={arriveStations}
          setCheckedTicketTypes={setCheckedTicketTypes}
          setCheckedTrainTypes={setCheckedTrainTypes}
          setCheckedDepartStations={setCheckedDepartStations}
          setCheckedArriveStations={setCheckedArriveStations}
          setDepartTimeEnd={setDepartTimeEnd}
          setDepartTimeStart={setDepartTimeStart}
          setArriveTimeEnd={setArriveTimeEnd}
          setArriveTimeStar={setArriveTimeStart}
          toggleIsFiltersVisible={toggleIsFiltersVisible}
        />
      )}
    </div>
  )
})
