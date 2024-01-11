import { FunctionComponent, useEffect, useState } from 'react'
import { View, Text, StyleSheet, Switch } from 'react-native'
import { DARK, GOLD, WHITE } from '../../consts/colors'
import { DayTraining } from '../../types/calendar.types'
import { InitExercise } from '../../data/initTraning'

const PTItem: FunctionComponent<{
  item: InitExercise
  index: number
  exercisePersonList: DayTraining[]
  setExercisePersonlist: (list: DayTraining[]) => void
  isActive: boolean
}> = ({ index, exercisePersonList, setExercisePersonlist, isActive, item }) => {
  const isInclude = exercisePersonList?.find((el) => el.exercise === item.exercise)
  const [isEnabled, setIsEnabled] = useState(false)

  useEffect(() => setIsEnabled(!!isInclude), [isActive])
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState)

  const handleAddexercise = (exercise: string) => {
    if (isEnabled && exercisePersonList.find((el) => el.exercise === exercise)) {
      const newList = exercisePersonList.filter((el) => el.exercise !== exercise)
      setExercisePersonlist(newList)
      toggleSwitch()
    }
    if (!isEnabled && !exercisePersonList.find((el) => el.exercise === exercise)) {
      setExercisePersonlist([...exercisePersonList, item])
      toggleSwitch()
    }
  }

  return (
    <View style={styles.item}>
      <Text style={styles.text}>
        {index + 1}. {item?.exercise}
      </Text>
      {isActive && (
        <Switch
          trackColor={{ false: '#767577', true: DARK }}
          thumbColor={isEnabled ? GOLD : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => handleAddexercise(item?.exercise)}
          value={isEnabled}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    color: WHITE,
  },
  item: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})

export default PTItem
