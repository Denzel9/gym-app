import { FunctionComponent } from 'react'
import { StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native'
import { DARK, GOLD, WHITE } from '../../../../consts/colors'
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons'
import { TrainingDayInterface } from '../../../../types/calendar.types'

const CDItemEdit: FunctionComponent<{ dayTraining: TrainingDayInterface }> = ({ dayTraining }) => {
  const handleDoubleExercise = () => {}
  return (
    <View style={styles.wrapper}>
      <View style={{ marginTop: 25, position: 'relative' }}>
        <TouchableOpacity
          onPress={() => {}}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 5,
            marginTop: 7,
            width: 'auto',
          }}
        >
          <>
            <Feather name="copy" color={WHITE} size={20} />
            <Text style={styles.text}>Дублировать</Text>
          </>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {}}
          style={{ flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 7 }}
        >
          <>
            <Feather name="refresh-ccw" color={WHITE} size={20} />
            <Text style={styles.text}>Заменить</Text>
          </>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {}}
          style={{ flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 7 }}
        >
          <>
            <Feather name="delete" color={WHITE} size={20} />
            <Text style={styles.text}>Удалить</Text>
          </>
        </TouchableOpacity>
        <TouchableHighlight
          style={{ position: 'absolute', right: -2, bottom: 5 }}
          onPress={() => {}}
          underlayColor={GOLD}
        >
          <MaterialCommunityIcons
            name="heart"
            color={WHITE}
            size={20}
            style={{ textAlign: 'right' }}
          />
        </TouchableHighlight>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: DARK,
    width: '105%',
    height: '185%',
    borderRadius: 20,
    padding: 10,
  },
  text: {
    color: WHITE,
  },
})

export default CDItemEdit
