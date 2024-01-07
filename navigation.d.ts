import { TypeRootStackParamsList } from './app/components/navigation/types.navigation'

declare global {
  namespace ReactNavigator {
    interface RootParamList extends TypeRootStackParamsList {}
  }
}
