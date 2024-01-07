import { FunctionComponent } from 'react'
import CalendarItem from './CalendarItem'
import { getMonthDays, weekDays } from '../../../helpers/getDate'
import { useProfile } from '../../../hooks/useProfile'
import { StyleSheet, Text, View } from 'react-native'
import { DARK, WHITE } from '../../../consts/colors'

const Calendar: FunctionComponent<{
  dayfilter: string
  setDayFilter(dayfilter: string): void
  monthFilter: number
  selectedDay: number
  setSelectedDay(selectedDay: number): void
  yearFilter: number
}> = ({ dayfilter, setDayFilter, monthFilter, selectedDay, setSelectedDay, yearFilter }) => {
  const { calendar } = useProfile()
  const trainingDay = calendar?.calendar?.filter((el) => el.training.length)

  return (
    <View>
      <View style={styles.week}>
        {weekDays.map((el) => {
          return (
            <Text key={el} style={styles.text}>
              {el}
            </Text>
          )
        })}
      </View>
      <View style={styles.days}>
        {getMonthDays(monthFilter).map((el) => {
          return (
            <CalendarItem
              yearFilter={yearFilter}
              monthFilter={monthFilter}
              key={el}
              title={el}
              trainingDay={trainingDay!}
              dayfilter={dayfilter}
              setDayFilter={setDayFilter}
              selectedDay={selectedDay}
              setSelectedDay={setSelectedDay}
            />
          )
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  week: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    backgroundColor: DARK,
  },
  days: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: 5,
    columnGap: 18,
  },
  text: {
    textAlign: 'center',
    color: WHITE,
    padding: 5,
  },
})

export default Calendar
