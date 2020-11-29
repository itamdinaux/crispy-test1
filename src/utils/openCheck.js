export function OpenClose(a) {
  const today = new Date()
  const day = today.getUTCDay() === 0 ? 7 : today.getUTCDay()

  const hour = (today.getUTCHours() + 1) * 100
 
  let check = 0


  a.c.horaire[day - 1].hour.map(item => {
    if (item.debut < hour && item.fin > hour) {
      check++
    }

    return false
  })
  
  

  

  console.log(check ? "open" : "closed")
  return check ? true : false
}
