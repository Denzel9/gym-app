import { FunctionComponent, useState } from 'react'
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native'
import { SetsExercise, TrainingDayInterface } from '../../../../types/calendar.types'
import { GOLD, WHITE } from '../../../../consts/colors'
import { Feather } from '@expo/vector-icons'
import { useTraining } from '../../../../hooks/useTraining'
import CDItemEdit from './CDItemEdit'

const CDItem: FunctionComponent<{
  sets: SetsExercise[]
  edit: boolean
  title: string
  dayTraining: TrainingDayInterface
}> = ({ edit, sets, title, dayTraining }) => {
  const [menuItem, setMenuItem] = useState(false)

  const { updateTraining, deleteTrainingDay } = useTraining()

  const handleDeleteExercise = (title: string) => {
    const newDayTraining = dayTraining?.training?.filter((el) => el.exercise !== title)
    newDayTraining.length
      ? updateTraining(dayTraining?.docId!, newDayTraining)
      : deleteTrainingDay(dayTraining?.docId!)
  }

  const repeats = sets?.reduce((acc, cur) => (acc += +cur.repeats), 0)
  const weight = sets?.reduce((acc, cur) => (acc += +cur.weight * +cur.repeats), 0)
  return (
    <View style={[styles.wrapper, menuItem && { paddingBottom: 50 }]}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {edit && (
          <TouchableHighlight
            style={styles.deleteButton}
            onPress={() => handleDeleteExercise(title)}
            underlayColor={GOLD}
          >
            <Feather name="x" color={WHITE} size={20} />
          </TouchableHighlight>
        )}
        {!edit && (
          <TouchableHighlight onPress={() => setMenuItem(!menuItem)} underlayColor={GOLD}>
            <Feather name="menu" color={WHITE} size={20} />
          </TouchableHighlight>
        )}
      </View>
      <View style={styles.content}>
        <View>
          <Text style={styles.contentTitle}>Подходов</Text>
          <Text style={styles.contentSubTitle}>{sets?.length || 3}</Text>
        </View>
        <View>
          <Text style={styles.contentTitle}>Повторений</Text>
          <Text style={styles.contentSubTitle}>{repeats === 0 ? '-' : repeats}</Text>
        </View>
        <View>
          <Text style={styles.contentTitle}>Общий вес</Text>
          <Text style={styles.contentSubTitle}>{weight === 0 ? '-' : weight}</Text>
        </View>
      </View>
      {menuItem && <CDItemEdit />}
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 20,
    borderColor: GOLD,
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    position: 'relative',
  },
  header: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 1,
  },
  deleteButton: {
    position: 'absolute',
    right: 0,
  },
  title: {
    color: WHITE,
    fontSize: 20,
  },
  content: {
    flexDirection: 'row',
    gap: 15,
    marginTop: 10,
  },
  contentTitle: { color: WHITE, fontSize: 16 },
  contentSubTitle: { color: WHITE },
})

export default CDItem
