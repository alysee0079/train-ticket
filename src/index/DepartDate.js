import React, { useMemo } from 'react'
import dayjs from 'dayjs'
import './DepartDate.css'
import { h0 } from '../common/fp'

export default function DepartDate(props) {
  const { time, onClick } = props
  const h0ofDepart = h0(time)

  const departDateStr = useMemo(() => {
    return dayjs(h0ofDepart).format('YYYY-MM-DD')
  }, [h0ofDepart])
  const departDate = new Date(h0ofDepart).getDay()
  const isToday = h0ofDepart === h0()

  const weekStr = `周${
    ['日', '一', '二', '三', '四', '五', '六'][departDate]
  } ${isToday ? '(今天)' : ''}`

  return (
    <div className="depart-date" onClick={onClick}>
      <input type="hidden" name="date" value={departDateStr} />
      {departDateStr} <span className="depart-week">{weekStr}</span>
    </div>
  )
}
