import { FunctionComponent, useContext } from 'react'
import CalendarItem from './CalendarItem'
import { getMonthDays, weekDays } from '../../../helpers/getDate'
import { StyleSheet, Text, View } from 'react-native'
import { DARK, WHITE } from '../../../consts/colors'
import { UserContext } from '../../../providers/UserProvider'

const Calendar: FunctionComponent<{
  dayfilter: string
  setDayFilter(dayfilter: string): void
  monthFilter: number
  selectedDay: number
  setSelectedDay(selectedDay: number): void
  yearFilter: number
}> = ({ dayfilter, setDayFilter, monthFilter, selectedDay, setSelectedDay, yearFilter }) => {
  const { calendar } = useContext(UserContext)
  const trainingDay = calendar?.filter((el) => el.training.length)

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
      <View style={styles.itemsWrap}>
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
  text: {
    textAlign: 'center',
    color: WHITE,
    width: 50,
    padding: 5,
  },
  itemsWrap: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10,
    flexWrap: 'wrap',
    rowGap: 5,
    columnGap: 4,
  },
})

export default Calendar
