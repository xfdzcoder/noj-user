export const setIntervalImmediately = (func: () => void, stepTime: number) => {
  func()
  return setInterval(func, stepTime)
}

export const getDateStr = (date: Date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
}
