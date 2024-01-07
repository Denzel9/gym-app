import { FunctionComponent, ReactNode } from 'react'
import { StyleSheet, View } from 'react-native'

const Container: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
  return <View style={styles.container}>{children}</View>
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
})

export default Container
