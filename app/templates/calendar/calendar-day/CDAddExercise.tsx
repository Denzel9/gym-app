import { FunctionComponent } from 'react'
import { View, Pressable, Text, StyleSheet } from 'react-native'
import Field from '../../../components/ui/Field'
import { WHITE } from '../../../consts/colors'

interface CDAddExerciseProps {
  exercise: string
  setExercise: (exercise: string) => void
  editExercise: boolean
  setEditExercise: (editExercise: boolean) => void
}

const CDAddExercise: FunctionComponent<CDAddExerciseProps> = ({
  exercise,
  setEditExercise,
  setExercise,
  editExercise,
}) => {
  return (
    <View style={styles.wrapper}>
      {editExercise && (
        <Pressable onPress={() => setEditExercise(false)}>
          <Text style={styles.closeButton}>Закрыть</Text>
        </Pressable>
      )}
      <Field
        value={exercise}
        onChange={(value) => setExercise(value)}
        placeholder={'Что будем делать?'}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
  },
  closeButton: {
    textAlign: 'right',
    color: WHITE,
    marginBottom: 7,
    marginTop: 10,
    opacity: 0.5,
  },
})

export default CDAddExercise
