import { Actionsheet, useDisclose, useToast } from 'native-base'
import React, { FunctionComponent, useState } from 'react'
import { View, Text, StyleSheet, Pressable, TouchableHighlight, Alert } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { DARK, GOLD, WHITE } from '../../../consts/colors'
import Field from '../../../components/ui/Field'
import { useUser } from '../../../hooks/useUser'

const PEItem: FunctionComponent<{
  data: string
  title: string
  id: string
  name: string
  update: (name: string, tex: string, id: string) => Promise<void>
}> = ({ data, title, id, name, update }) => {
  const [text, setText] = useState('')
  const [edit, setEdit] = useState(false)

  const toast = useToast()

  const handleUpdateUserData = () => {
    update(name, text, id)
    setEdit(false)
    setText('')
    toast.show({
      title: 'Данные обновлены',
      placement: 'top-right',
      backgroundColor: GOLD,
    })
  }

  return (
    <Actionsheet.Item w="100%" style={styles.wrapper}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        {edit ? (
          <View>
            <View style={{ position: 'relative', flexDirection: 'row' }}>
              <Field
                value={text}
                onChange={(value) => setText(value)}
                placeholder={`ВВедите ${title.toLowerCase()}`}
              />
              <Pressable style={styles.button} onPress={handleUpdateUserData}>
                <Text style={{ color: WHITE }}>Сохранить</Text>
              </Pressable>
            </View>
            <TouchableHighlight style={{ marginTop: 10 }} onPress={() => setEdit(false)}>
              <Text style={{ opacity: 0.5, textAlign: 'right' }}>Закрыть</Text>
            </TouchableHighlight>
          </View>
        ) : (
          <>
            <Text style={styles.test}>
              {title}: {data}
            </Text>
            <MaterialIcons name="edit" size={20} onPress={() => setEdit(true)} />
          </>
        )}
      </View>
    </Actionsheet.Item>
  )
}

const styles = StyleSheet.create({
  test: {
    fontSize: 20,
  },
  wrapper: {
    borderBottomColor: GOLD,
    borderBottomWidth: 1,
  },
  button: {
    position: 'absolute',
    right: 0,
    backgroundColor: DARK,
    padding: 11,
    borderRadius: 10,
    zIndex: 2,
  },
})

export default PEItem
