import React, { FunctionComponent, useEffect, useState } from 'react'

import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native'
import Calendar from '../../templates/calendar/CalendarPage'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Footer from '../Layout/footer/Footer'

import { useAuth } from '../../hooks/useAuth'
import HomePage from '../../templates/home/HomePage'
import CalendarPage from '../../templates/calendar/CalendarPage'
import ProfilePage from '../../templates/profile/ProfilePage'
import TrainingPage from '../../templates/training/TrainingPage'
import AuthPage from '../../templates/auth/AuthPage'

const Navigator: FunctionComponent = () => {
  const Stack = createNativeStackNavigator()
  const { user } = useAuth()
  const ref = useNavigationContainerRef()

  const [name, setName] = useState<string | undefined>(undefined)

  useEffect(() => {
    const timeout = setTimeout(() => setName(ref.getCurrentRoute()?.name), 100)
    return () => clearTimeout(timeout)
  }, [])

  useEffect(() => {
    const listener = ref.addListener('state', () => {
      setName(ref.getCurrentRoute()?.name), 100
    })
    return () => ref.removeListener('state', listener)
  }, [])

  return (
    <>
      <NavigationContainer ref={ref}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          {user ? (
            <>
              <Stack.Screen name="Home" component={HomePage} />
              <Stack.Screen
                name="Calendar"
                component={CalendarPage}
                initialParams={{ params: 0 }}
              />
              <Stack.Screen name="Training" component={TrainingPage} />
              <Stack.Screen name="Profile" component={ProfilePage} />
            </>
          ) : (
            <Stack.Screen name="Auth" component={AuthPage} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
      {user && <Footer navigate={ref.navigate} currentRoute={name} />}
    </>
  )
}

export default Navigator
