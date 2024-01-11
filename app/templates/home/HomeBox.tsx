import { FunctionComponent } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import {
  TypeRootStackParamsList,
  UseNavigationProp,
} from '../../components/navigation/types.navigation'
import { useNavigation } from '@react-navigation/native'

interface IHomeBox {
  title: string
  titleButton: string
  link: keyof TypeRootStackParamsList
  isDate?(): string | undefined | false
  params?: any
}

const HomeBox: FunctionComponent<IHomeBox> = ({ title, link, isDate, titleButton, params }) => {
  const { navigate } = useNavigation<UseNavigationProp>()
  return (
    <View style={styles.box}>
      <View style={styles.boxDate}>
        <Text style={styles.title}>{title}</Text>
        {isDate && <Text style={styles.subTitle}>{isDate()}</Text>}
      </View>
      <TouchableOpacity onPress={() => navigate(link, params)} style={styles.button}>
        <Text style={styles.buttonText}>{titleButton}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  box: {
    marginTop: 20,
    width: '100%',
    height: 75,
    borderColor: '#e8aa00',
    borderWidth: 1,
    display: 'flex',
    justifyContent: 'space-between',
    borderRadius: 20,
    padding: 10,
    position: 'relative',
  },
  boxDate: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 20,
  },
  subTitle: {
    display: 'flex',
    gap: 2,
    alignItems: 'center',
    color: '#fff',
    fontSize: 15,
  },
  button: {
    borderColor: '#e8aa00',
    backgroundColor: '#e8aa00',
    color: '#fff',
    borderWidth: 1,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 30,
    position: 'absolute',
    bottom: -10,
    left: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
  },
})

export default HomeBox
