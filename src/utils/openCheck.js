export function OpenClose(a) {
  const today = new Date()
  const day = today.getUTCDay() === 0 ? 7 : today.getUTCDay()

  const hour = (today.getUTCHours() + 1) * 100 + today.getUTCMinutes()

  let check = 0
  a[day - 1].hour.map(item => {
    if (item.debut < hour && item.fin > hour) {
      check++
    }
    return false
  })

  return check ? true : false
}
