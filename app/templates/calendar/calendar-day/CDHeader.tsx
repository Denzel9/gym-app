import { FunctionComponent } from 'react'
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import { WHITE } from '../../../consts/colors'
import { AntDesign } from '@expo/vector-icons'

interface CalendarDayHeaderProps {
  showPlanDay: boolean
  edit: boolean
  setShowPlanDay: (showPlanDay: boolean) => void
  setEdit: (edit: boolean) => void
}

const CalendarDayHeader: FunctionComponent<CalendarDayHeaderProps> = ({
  edit,
  setEdit,
  setShowPlanDay,
  showPlanDay,
}) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.wrapperDay}>
        <Text style={styles.wrapperDayText}>План на день</Text>
        <TouchableHighlight onPress={() => setShowPlanDay(!showPlanDay)}>
          <Text style={styles.wrapperDayButton}>
            <AntDesign name={showPlanDay ? 'down' : 'up'} size={20} color={WHITE} />
          </Text>
        </TouchableHighlight>
      </View>
      <TouchableHighlight onPress={() => setEdit(!edit)}>
        <Text style={styles.wrapperDayButton}>{edit ? 'Сохранить' : 'Редактировать'}</Text>
      </TouchableHighlight>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  wrapperDay: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 10,
  },
  wrapperDayText: {
    marginTop: 20,
    fontSize: 20,
    color: WHITE,
  },
  wrapperDayButton: {
    fontSize: 15,
    color: WHITE,
  },
})

export default CalendarDayHeader
