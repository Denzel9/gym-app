import { FunctionComponent } from 'react'
import { StyleSheet, Text } from 'react-native'
import { WHITE } from '../../consts/colors'

const HeaderText: FunctionComponent<{ title: string }> = ({ title }) => {
  return <Text style={styles.title}>{title}</Text>
}

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    color: WHITE,
    fontWeight: 'bold',
  },
})

export default HeaderText
