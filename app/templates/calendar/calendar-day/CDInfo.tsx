import { FunctionComponent } from 'react'
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import { DARK, GOLD, WHITE } from '../../../consts/colors'
import { TODAY } from '../../../helpers/getDate'
import { useNavigation } from '@react-navigation/native'
import { UseNavigationProp } from '../../../components/navigation/types.navigation'

interface CDInfoProps {
  availableDay: () => boolean | undefined
  date: string
}

const CDInfo: FunctionComponent<CDInfoProps> = ({ date, availableDay }) => {
  const { navigate } = useNavigation<UseNavigationProp>()
  return (
    <View style={styles.wrapper}>
      {availableDay() ? (
        <Text style={styles.wrapperDayText}>
          {`${date === TODAY ? 'Сегодня' : 'В этот день'} тренировка не запланирована`}
        </Text>
      ) : (
        <Text style={styles.wrapperDayText}>В этот день тренировки не было</Text>
      )}
      {availableDay() && (
        <TouchableHighlight
          onPress={() => navigate('PlaningTraining', { date: date })}
          style={styles.wrapperButton}
        >
          <Text style={styles.wrapperButtonText}>Запланировать</Text>
        </TouchableHighlight>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  wrapperDayText: {
    fontSize: 25,
    fontWeight: 'bold',
    opacity: 0.5,
    textAlign: 'center',
    marginTop: 40,
    color: WHITE,
  },
  wrapperButton: {
    backgroundColor: DARK,
    padding: 10,
    borderRadius: 10,
    borderColor: GOLD,
    borderWidth: 1,
    marginTop: 20,
  },
  wrapperButtonText: {
    color: WHITE,
  },
})

export default CDInfo
