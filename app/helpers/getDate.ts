export const getMonth = (current: number) => {
  const month = [
    'Января',
    'Февраля',
    'Марта',
    'Апреля',
    'Мая',
    'Июня',
    'Июля',
    'Августа',
    'Сентября',
    'Октября',
    'Ноября',
    'Декабря',
  ]
  return month[current]
}

export const getMonthCalendar = (current: number) => {
  const month = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
  ]
  return month[current]
}

export const weekDays = ['Пн.', 'Вт.', 'Ср.', 'Чт.', 'Пт.', 'Сб.', 'Вс.']
export const quantityDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
export const currentMonth = new Date().getMonth()
export const currentYear = new Date().getFullYear()
export const TODAY = new Date().toLocaleDateString()
export const TODAY_NUMBER = String(new Date().getDate()).padStart(2, '0')
export const TODAY_DAY_MONTH = `${TODAY_NUMBER} ${getMonth(currentMonth)}`

export const TOMORROW = String(+TODAY.slice(0, 2) + 1)
  .padStart(2, '0')
  .concat(TODAY.slice(2))

export const getMonthDays = (month: number) => {
  const a: number[] = []
  for (let index = 0; index < quantityDays[month]; index++) {
    a.push(index + 1)
  }
  return a
}

export const getCurrentDay = (date: string) => {
  if (date === TODAY) return 'Сегодня'
  if (date === TOMORROW) return 'Завтра'
  return date
}
