import { FunctionComponent, ReactNode } from 'react'
import { LinearGradient } from 'expo-linear-gradient'

import { ScrollView } from 'react-native'
import Header from './Header'
import Container from '../ui/Container'

interface ILayout {
  isScrollView?: boolean
  children: ReactNode
}

const Layout: FunctionComponent<ILayout> = ({ children, isScrollView = false }) => {
  return (
    <LinearGradient
      colors={['#3a403f', '#212121']}
      start={{ x: 1.1, y: 0.9 }}
      style={{
        backgroundColor: '#383737',
        height: '100%',
        width: '100%',
      }}
    >
      {isScrollView ? (
        <Container>
          <ScrollView
            style={{ marginBottom: 70, height: '100%' }}
            showsVerticalScrollIndicator={false}
          >
            {children}
          </ScrollView>
        </Container>
      ) : (
        <Container>{children}</Container>
      )}
    </LinearGradient>
  )
}

export default Layout
