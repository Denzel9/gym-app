import type { CompositeNavigationProp } from '@react-navigation/native'
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import type { StackNavigationProp } from '@react-navigation/stack'

export type TypeRootStackParamsList = {
  Home: undefined
  Calendar: { params: number }
  Training: undefined
  Profile: undefined
  Auth: undefined
}

export type UseNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TypeRootStackParamsList>,
  StackNavigationProp<TypeRootStackParamsList>
>
