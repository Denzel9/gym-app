import { FunctionComponent, useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Layout from '../../components/Layout/Layout'
import HeaderText from '../../components/ui/HeaderText'
import { TODAY_NUMBER, currentMonth, currentYear, getMonthCalendar } from '../../helpers/getDate'
import { AntDesign } from '@expo/vector-icons'
import { WHITE } from '../../consts/colors'
import Calendar from '../../components/ui/calendar/Calendar'

import { useTraining } from '../../hooks/useTraining'
import CalendarDay from './calendar-day/CalendarDay'
import { TrainingDayInterface } from '../../types/calendar.types'
import Button from '../../components/ui/Button'

const CalendarPage: FunctionComponent<any> = () => {
  const [yearFilter, setYearFilter] = useState(currentYear)
  const [monthFilter, setMonthFilter] = useState(+String(currentMonth).padStart(2, '0'))
  const [dayfilter, setDayFilter] = useState(TODAY_NUMBER)
  const [selectedDay, setSelectedDay] = useState(0)
  const [trainingDay, setTrainingDay] = useState<TrainingDayInterface>({} as TrainingDayInterface)

  const { getTraining, isLoading, deleteTrainingDay } = useTraining()

  const availableDay = () => {
    if (yearFilter > currentYear) return true
    if (monthFilter > currentMonth) return true
    if (dayfilter >= TODAY_NUMBER) return true
  }

  const handleAddYear = () => {
    setMonthFilter(0)
    setYearFilter(yearFilter + 1)
  }

  const handleDeleteYear = () => {
    setMonthFilter(11)
    setYearFilter(yearFilter - 1)
  }

  useEffect(() => {
    setTrainingDay(
      getTraining(`${dayfilter}.${String(monthFilter + 1).padStart(2, '0')}.${yearFilter}`)!
    )
  }, [dayfilter, monthFilter, yearFilter, isLoading])

  return (
    <Layout isScrollView>
      <View style={styles.calendarNavigation}>
        <HeaderText title="Календарь" />
        <View style={styles.monthNavigation}>
          <TouchableOpacity
            onPress={() =>
              monthFilter === 0 ? handleDeleteYear() : setMonthFilter((prev) => prev - 1)
            }
          >
            <AntDesign name="left" size={30} color={WHITE} />
          </TouchableOpacity>
          <Text style={styles.monthNavigationText}>{getMonthCalendar(monthFilter)}</Text>
          <TouchableOpacity
            onPress={() =>
              monthFilter === 11 ? handleAddYear() : setMonthFilter((prev) => prev + 1)
            }
          >
            <AntDesign name="right" size={30} color={WHITE} />
          </TouchableOpacity>
        </View>
      </View>
      <Calendar
        monthFilter={monthFilter}
        dayfilter={dayfilter}
        setDayFilter={setDayFilter}
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
        yearFilter={yearFilter}
      />
      <CalendarDay
        availableDay={availableDay}
        monthFilter={monthFilter}
        yearFilter={yearFilter}
        dayfilter={dayfilter}
        dayTraining={trainingDay}
        date={`${dayfilter}.${String(currentMonth + 1).padStart(2, '0')}.${currentYear}`}
      />
      {availableDay() && !!trainingDay?.training?.length && (
        <Button
          title={'Отменить тренировку'}
          onPress={() => deleteTrainingDay(trainingDay?.docId!)}
        />
      )}
    </Layout>
  )
}

const styles = StyleSheet.create({
  monthNavigation: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  monthNavigationText: {
    color: WHITE,
    fontSize: 18,
  },
  calendarNavigation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
})

export default CalendarPage
