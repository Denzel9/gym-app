import { FunctionComponent } from 'react'
import { StyleSheet, Text, TouchableHighlight } from 'react-native'
import { DARK, GOLD, WHITE } from '../../consts/colors'

interface IButtonProps {
  title: string
  onPress: () => void
}

const Button: FunctionComponent<IButtonProps> = ({ title, onPress }) => {
  return (
    <TouchableHighlight style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: DARK,
    padding: 10,
    borderRadius: 10,
    borderColor: GOLD,
    borderWidth: 1,
    marginTop: 20,
  },
  buttonText: {
    color: WHITE,
    textAlign: 'center',
  },
})

export default Button
