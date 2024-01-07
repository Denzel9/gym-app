import { FunctionComponent } from 'react'
import { Pressable, StyleSheet } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { IFooterItem } from './types.footer'
import { TypeRootStackParamsList } from '../../navigation/types.navigation'

const FooterItem: FunctionComponent<
  IFooterItem & {
    navigate: (screenName: keyof TypeRootStackParamsList) => void
    currentRoute?: string
  }
> = ({ iconName, title, navigate, currentRoute }) => {
  const isActive = currentRoute === title

  return (
    <Pressable onPress={() => navigate(title)} style={styles.button}>
      <AntDesign name={iconName} size={25} color={isActive ? '#e8aa00' : '#fff'} />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    padding: 20,
    alignItems: 'center',
    width: '20%',
  },
})

export default FooterItem
