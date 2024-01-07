import { FunctionComponent, useEffect } from 'react'
import classNames from 'classnames'
import { TODAY_NUMBER, currentMonth } from '../../../helpers/getDate'
import { TrainingDayInterface } from '../../../types/calendar.types'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { DARK, GOLD, WHITE } from '../../../consts/colors'

const CalendarItem: FunctionComponent<{
  title: number
  trainingDay: TrainingDayInterface[]
  dayfilter: string
  setDayFilter(dayfilter: string): void
  monthFilter: number
  selectedDay: number
  setSelectedDay(selectedDay: number): void
  yearFilter: number
}> = ({
  title,
  trainingDay,
  dayfilter,
  setDayFilter,
  monthFilter,
  selectedDay,
  setSelectedDay,
  yearFilter,
}) => {
  const isTrainingDay = trainingDay?.find(
    (el) =>
      el.date.slice(0, 2) === String(title).padStart(2, '0') &&
      +el.date.slice(3, 4) === monthFilter &&
      +el.date.slice(6, 12) === yearFilter
  )

  useEffect(() => setSelectedDay(0), [monthFilter, setSelectedDay])

  const handleSelectDay = () => {
    setDayFilter(String(title).padStart(2, '0'))
    setSelectedDay(title)
  }
  return (
    <TouchableOpacity
      style={[
        styles.item,
        +TODAY_NUMBER === title && monthFilter === currentMonth && styles.todayDay,
        selectedDay === title && styles.selectedDay,
        +dayfilter === title && styles.dayFilter,
      ]}
      onPress={handleSelectDay}
    >
      {isTrainingDay?.training && <View></View>}
      <Text style={styles.itemText}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  item: {
    width: 60,
    backgroundColor: DARK,
    textAlign: 'center',
    fontSize: 16,
    marginTop: 5,
    position: 'relative',
  },
  itemText: { color: WHITE, textAlign: 'center', fontSize: 20 },
  todayDay: {
    backgroundColor: '#0ac23e',
  },
  selectedDay: { backgroundColor: GOLD },
  dayFilter: { backgroundColor: GOLD },
})

export default CalendarItem
