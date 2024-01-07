import * as React from 'react'
import Navigator from './app/components/navigation/Navigator'
import AuthProvider from './app/providers/AuthProvider'
import { LogBox } from 'react-native'

export default function App() {
  return (
    <AuthProvider>
      <Navigator />
    </AuthProvider>
  )
}

LogBox.ignoreAllLogs()
