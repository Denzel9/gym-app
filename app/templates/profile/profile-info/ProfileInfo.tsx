import { FunctionComponent } from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import { DARK, GOLD, WHITE } from '../../../consts/colors'
import { useUser } from '../../../hooks/useUser'
import { AntDesign } from '@expo/vector-icons'
import { useToast } from 'native-base'
import { getLevelsText } from '../../../helpers/getLevelsText'

interface ProfileInfoProps {
  lastTraining: string
  nextTraining: string
  name: string
  email: string
  lastName: string
}

const ProfileInfo: FunctionComponent<ProfileInfoProps> = ({
  lastTraining,
  nextTraining,
  name,
  email,
  lastName,
}) => {
  const toast = useToast()

  const { getLevelsUser } = useUser()
  return (
    <View style={styles.wrapper}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={styles.user}>
          <Text style={{ fontSize: 30, fontWeight: 'bold', color: WHITE }}>{name.slice(0, 1)}</Text>
        </View>
        <View style={{ position: 'relative', marginRight: 20 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
            <Text>Уровень:</Text>
            <Text style={{ fontSize: 18 }}>{getLevelsUser()}</Text>
          </View>
          <Pressable
            style={{
              borderRadius: 50,
              position: 'absolute',
              right: -15,
              top: -5,
              backgroundColor: GOLD,
            }}
            onPress={() =>
              toast.show({
                title: getLevelsText(getLevelsUser()),
                placement: 'bottom',
                backgroundColor: GOLD,
              })
            }
          >
            <AntDesign name="question" size={20} color={WHITE} />
          </Pressable>
        </View>
      </View>
      <View style={{ marginTop: 10 }}>
        <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
          <Text style={{ fontSize: 18, fontWeight: '600' }}>Имя: </Text>
          <Text style={{ fontSize: 15 }}>{name}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
          <Text style={{ fontSize: 18, fontWeight: '600' }}>Фамилия: </Text>
          <Text style={{ fontSize: 15 }}>{lastName}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
          <Text style={{ fontSize: 18, fontWeight: '600' }}>Почта: </Text>
          <Text style={{ fontSize: 15 }}>{email}</Text>
        </View>
        {lastTraining && (
          <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
            <Text style={{ fontSize: 18, fontWeight: '600' }}>Предыдущая тренировка: </Text>
            <Text style={{ fontSize: 15 }}>{lastTraining}</Text>
          </View>
        )}
        {nextTraining && (
          <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
            <Text style={{ fontSize: 18, fontWeight: '600' }}>Следующая тренировка: </Text>
            <Text style={{ fontSize: 15 }}>{nextTraining}</Text>
          </View>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#ffffffd7',
    borderRadius: 20,
    padding: 10,
  },

  user: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: DARK,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: GOLD,
    borderWidth: 2,
  },
})

export default ProfileInfo
