export const h0 = (timestamp = Date.now()) => {
  let target = new Date(timestamp)
  target.setHours(0)
  target.setMinutes(0)
  target.setSeconds(0)
  target.setMilliseconds(0)
  return target.getTime()
}
