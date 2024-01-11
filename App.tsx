import * as React from 'react'
import Navigator from './app/components/navigation/Navigator'
import AuthProvider from './app/providers/AuthProvider'
import { LogBox } from 'react-native'
import UserProvider from './app/providers/UserProvider'
import { NativeBaseProvider } from 'native-base'
import { Provider } from 'react-redux'
import { store } from './app/redux/store'

export default function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <UserProvider>
          <NativeBaseProvider>
            <Navigator />
          </NativeBaseProvider>
        </UserProvider>
      </AuthProvider>
    </Provider>
  )
}



LogBox.ignoreAllLogs()
