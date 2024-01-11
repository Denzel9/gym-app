import { FunctionComponent, useState } from 'react'
import { View, TouchableHighlight, Text, StyleSheet } from 'react-native'
import { DARK, GOLD, WHITE } from '../../consts/colors'

const PTHeader: FunctionComponent<{
  date: string
  isActive: boolean
  handleChangeIsActive: () => void
}> = ({ date, isActive, handleChangeIsActive }) => {
  return (
    <>
      <Text style={styles.title}>План тренировки на: {date}</Text>
      <View style={styles.item}>
        <TouchableHighlight
          style={[styles.button, !isActive && { backgroundColor: DARK }]}
          onPress={handleChangeIsActive}
        >
          <Text style={styles.text}>Выбрать набоp</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={[styles.button, isActive && { backgroundColor: DARK }]}
          onPress={handleChangeIsActive}
        >
          <Text style={styles.text}>Свой набор</Text>
        </TouchableHighlight>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  goBack: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 20 },
  text: {
    color: WHITE,
    textAlign: 'center',
  },
  title: {
    fontSize: 20,
    color: WHITE,
  },
  item: {
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: GOLD,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    borderRadius: 10,
  },
  button: { width: '50%', padding: 10, borderRadius: 10 },
})

export default PTHeader
