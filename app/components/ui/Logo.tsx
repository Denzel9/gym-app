import { FunctionComponent } from 'react'
import { StyleSheet, Text } from 'react-native'
import { WHITE } from '../../consts/colors'

const Logo: FunctionComponent<{ styles?: string }> = ({ styles }) => {
  return <Text style={{ fontSize: 40, fontWeight: 'bold', color: WHITE, padding: 20 }}>DNGYM</Text>
}

export default Logo
