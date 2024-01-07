import { FunctionComponent } from 'react'
import { ActivityIndicator } from 'react-native'
import { GOLD } from '../../consts/colors'

const Loader: FunctionComponent = () => {
  return <ActivityIndicator size="large" color={GOLD} />
}

export default Loader
