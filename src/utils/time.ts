export const setIntervalImmediately = (func: () => void, stepTime: number) => {
  func()
  return setInterval(func, stepTime)
}
