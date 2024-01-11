import { FunctionComponent } from 'react'
import { ActivityIndicator } from 'react-native'
import { GOLD } from '../../consts/colors'

const Loader: FunctionComponent<{ styles?: {} }> = ({ styles }) => {
  return <ActivityIndicator size="large" color={GOLD} style={{ ...styles }} />
}

export default Loader
