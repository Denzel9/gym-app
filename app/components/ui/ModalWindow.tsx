import React, { FunctionComponent, useMemo } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import Button from './Button'

const ModalWindow: FunctionComponent<{
  modalVisible: boolean
  setModalVisible: (modalVisible: boolean) => void
  date: string
}> = ({ setModalVisible, modalVisible, date }) => {
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text>Awesome 🎉</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
})

export default ModalWindow
