import { TypeRootStackParamsList } from '../../navigation/types.navigation'
import { AntDesign } from '@expo/vector-icons'

export type IFooterItem = {
  iconName: keyof typeof AntDesign.glyphMap
  title: keyof TypeRootStackParamsList
}
