import React, { memo, useMemo } from 'react'
import URI from 'urijs'
import './List.css'

const ListItem = memo(props => {
  const {
    dTime,
    aTime,
    dStation,
    aStation,
    trainNumber,
    date,
    time,
    priceMsg,
    dayAfter
  } = props

  // 详情页面
  const url = useMemo(() => {
    return new URI('ticket.html')
      .setSearch('aStation', aStation)
      .setSearch('dStation', dStation)
      .setSearch('trainNumber', trainNumber)
      .setSearch('date', date)
      .toString()
  }, [aStation, dStation, trainNumber, date])

  return (
    <li className="list-item">
      <a href={url}>
        <span className="item-time">
          <em>{dTime}</em>
          <br />
          <em className="em-light">
            {aTime}
            <i className="time-after">{dayAfter}</i>
          </em>
        </span>
        <span className="item-stations">
          <em>
            <i className="train-station train-start">始</i>
            {dStation}
          </em>
          <br />
          <em className="em-light">
            <i className="train-station train-start">终</i>
            {aStation}
          </em>
        </span>
        <span className="item-train">
          <em>{trainNumber}</em>
          <br />
          <em className="em-light">{time}</em>
        </span>
        <span className="item-ticket">
          <em>{priceMsg}</em>
          <br />
          <em className="em-light-orange">可抢票</em>
        </span>
      </a>
    </li>
  )
})

export default memo(function List(props) {
  const { list } = props

  return (
    <ul className="list">
      {list.map(item => {
        return <ListItem {...item} key={item.trainNumber} />
      })}
    </ul>
  )
})
