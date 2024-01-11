import { FunctionComponent, useEffect, useState } from 'react'
import { CheckIcon, Select, useDisclose } from 'native-base'
import { useNavigation } from '@react-navigation/native'
import { AntDesign, MaterialIcons } from '@expo/vector-icons'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { DayTraining, TrainingDayInterface } from '../../types/calendar.types'
import Button from '../../components/ui/Button'
import Field from '../../components/ui/Field'
import Layout from '../../components/Layout/Layout'
import { GOLD, WHITE } from '../../consts/colors'
import { UseNavigationProp } from '../../components/navigation/types.navigation'
import { InitExerciseType, initExerciseType } from '../../data/initTraning'
import BottomSheet from '../../components/ui/BottomSheet'
import PTItem from './PTItem'
import PTHeader from './PTHeader'
import { useToast } from 'native-base'
import Loader from '../../components/ui/Loader'
import { useTraining } from '../../hooks/useTraining'

const PlaningTraining: FunctionComponent<{ route: any }> = ({ route }) => {
  const { goBack } = useNavigation<UseNavigationProp>()
  const { isOpen, onOpen, onClose } = useDisclose()
  const date = route?.params?.date
  const toast = useToast()

  const [isActive, setIsActive] = useState(false)
  const [typeTraining, setTypeTraining] = useState('')
  const [addNewExercise, setAddNewExercise] = useState(false)
  const [exerciseName, setExerciseName] = useState('')
  const [exercisePersonList, setExercisePersonlist] = useState<DayTraining[]>([])
  const [currentTypeExercises, setCurrentTypeExercises] = useState<InitExerciseType>(
    {} as InitExerciseType
  )

  const { addTrainingDay, isLoading } = useTraining()

  const handleChangeIsActive = () => {
    !isActive && setExercisePersonlist([])
    setIsActive(!isActive)
  }

  const handleAddExercise = () => {
    setExercisePersonlist([
      ...exercisePersonList,
      { exercise: exerciseName.charAt(0).toUpperCase().concat(exerciseName.slice(1)), sets: [] },
    ])
    setExerciseName('')
    toast.show({
      title: 'Упражнение добавлено',
      placement: 'top-right',
      backgroundColor: GOLD,
    })
  }

  useEffect(() => {
    const current = initExerciseType.find((el) => el.type === typeTraining)
    if (current) setCurrentTypeExercises(current)
  }, [typeTraining])

  useEffect(() => {
    !isActive && setExercisePersonlist(currentTypeExercises?.exercise)
  }, [isActive, currentTypeExercises])

  return (
    <Layout>
      <View style={{ position: 'relative', height: '100%' }}>
        <Pressable style={styles.goBack} onPress={() => goBack()}>
          <AntDesign name="left" size={20} color={WHITE} />
          <Text style={styles.text}>Назад</Text>
        </Pressable>

        <PTHeader date={date} isActive={isActive} handleChangeIsActive={handleChangeIsActive} />

        <Text style={styles.text}>Тип тренировки:</Text>

        <Select
          borderColor={GOLD}
          color={WHITE}
          selectedValue={typeTraining}
          minWidth="200"
          accessibilityLabel="Выберите тип тренировки"
          placeholder="Выберите тип тренировки"
          _selectedItem={{
            bg: GOLD,
            borderRadius: 20,
            endIcon: <CheckIcon size="5" />,
          }}
          mt={5}
          onValueChange={(itemValue) => setTypeTraining(itemValue)}
        >
          {initExerciseType.map((el: any) => {
            return <Select.Item label={el.type} value={el.type} />
          })}
        </Select>

        {currentTypeExercises?.exercise?.map((el, i) => {
          return (
            <PTItem
              item={el}
              key={el.exercise}
              index={i}
              exercisePersonList={exercisePersonList!}
              setExercisePersonlist={setExercisePersonlist}
              isActive={isActive}
            />
          )
        })}

        {addNewExercise && (
          <View>
            <Pressable onPress={() => setAddNewExercise(false)}>
              <Text
                style={[
                  styles.text,
                  { opacity: 0.5, textAlign: 'right', marginBottom: 10, marginTop: 10 },
                ]}
              >
                Закрыть
              </Text>
            </Pressable>
            <Field
              value={exerciseName}
              onChange={(value) => setExerciseName(value)}
              placeholder={'Упражнение'}
            />
          </View>
        )}

        <Button
          title={addNewExercise ? 'Сохранить упражнение' : 'Добавить упражнение'}
          onPress={addNewExercise ? handleAddExercise : () => setAddNewExercise(true)}
        />

        {isLoading ? (
          <Loader styles={{ marginTop: 20 }} />
        ) : (
          <Button
            title={'Запланировать'}
            onPress={() => {
              console.log(exercisePersonList?.length)
              if (exercisePersonList?.length) {
                addTrainingDay(
                  date,
                  typeTraining,
                  exercisePersonList as unknown as TrainingDayInterface
                )
                setTimeout(() => goBack(), 500)
              } else {
                toast.show({
                  title: 'Добавьте упражнения',
                  placement: 'top-right',
                  backgroundColor: 'red.800',
                })
              }
            }}
          />
        )}

        <BottomSheet isOpen={isOpen} onClose={onClose} list={exercisePersonList!} />

        <Pressable onPress={onOpen} style={styles.personListButton}>
          <View style={{ position: 'relative' }}>
            <View style={styles.personListButtonWrapper}>
              <Text style={{ color: WHITE, fontSize: 20, fontWeight: 'bold' }}>
                {exercisePersonList?.length || 0}
              </Text>
            </View>
            <Text>
              <MaterialIcons name="list" size={40} color={WHITE} />
            </Text>
          </View>
        </Pressable>
      </View>
    </Layout>
  )
}

const styles = StyleSheet.create({
  goBack: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 20 },
  text: {
    color: WHITE,
  },
  title: {
    fontSize: 20,
  },
  item: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  personListButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  personListButtonWrapper: {
    position: 'absolute',
    right: 0,
    top: 0,
    backgroundColor: GOLD,
    paddingTop: 1,
    paddingBottom: 1,
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 50,
    zIndex: 1,
  },
})

export default PlaningTraining
