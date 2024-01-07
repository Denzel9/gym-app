import { FunctionComponent } from 'react'
import { StyleSheet, TextInput } from 'react-native'
import { DARK, GOLD, WHITE } from '../../consts/colors'

interface IField {
  value: string
  onChange: (value: string) => void
  placeholder: string
  isSecure?: boolean
}

const Field: FunctionComponent<IField> = ({ onChange, placeholder, value, isSecure }) => {
  return (
    <TextInput
      style={styles.field}
      placeholder={placeholder}
      value={value}
      onChangeText={(value) => onChange(value)}
      secureTextEntry={isSecure}
      showSoftInputOnFocus={true}
      autoCapitalize="none"
    />
  )
}

const styles = StyleSheet.create({
  field: {
    width: '100%',
    backgroundColor: WHITE,
    borderColor: GOLD,
    borderWidth: 1,
    height: 40,
    marginTop: 20,
    borderRadius: 10,
    color: DARK,
    paddingLeft: 10,
    paddingRight: 10,
  },
})

export default Field
