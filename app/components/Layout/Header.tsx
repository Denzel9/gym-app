import { FunctionComponent } from 'react'
import { View } from 'react-native'
import Logo from '../ui/Logo'
import { DARK } from '../../consts/colors'

const Header: FunctionComponent = () => {
  return (
    <View style={{ backgroundColor: DARK, paddingTop: 35 }}>
      <Logo />
    </View>
  )
}

export default Header
