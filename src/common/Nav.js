import classNames from 'classnames'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import React, { memo, useMemo } from 'react'
import './Nav.css'

export default memo(function Nav(props) {
  const { date, prev, next, isPrevDisabled, isNextDisabled } = props
  const currentString = useMemo(() => {
    const d = dayjs(date)
    return d.format('M月D日 ') + d.locale('zh-cn').format('ddd')
  }, [date])

  return (
    <div className="nav">
      <span
        onClick={prev}
        className={classNames('nav-prev', {
          'nav-disabled': isPrevDisabled
        })}
      >
        前一天
      </span>
      <span className="nav-current">{currentString}</span>
      <span
        onClick={next}
        className={classNames('nav-next', {
          'nav-disabled': isNextDisabled
        })}
      >
        后一天
      </span>
    </div>
  )
})
