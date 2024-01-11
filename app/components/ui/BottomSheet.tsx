import { FunctionComponent, ReactNode } from 'react'
import { Actionsheet, Box } from 'native-base'
import { StyleSheet, Text } from 'react-native'
import { DARK, GOLD } from '../../consts/colors'
import { DayTraining } from '../../types/calendar.types'

interface BottomSheetProps {
  isOpen: boolean
  onClose: () => void
  list?: DayTraining[]
  children?: ReactNode
}

const BottomSheet: FunctionComponent<BottomSheetProps> = ({ isOpen, onClose, list, children }) => {
  return (
    <Actionsheet isOpen={isOpen} onClose={onClose} w={'100%'}>
      {children ? (
        <Actionsheet.Content alignItems={'normal'}>{children}</Actionsheet.Content>
      ) : (
        <Actionsheet.Content>
          <Box w="100%" h={60} px={4} justifyContent="center">
            <Text style={{ fontSize: 16, color: DARK }}>
              Список ваших упражнений {!list?.length && 'пуст...'}
            </Text>
          </Box>
          {list?.map((el) => {
            return (
              <Actionsheet.Item w="100%" key={el.exercise}>
                <Text style={styles.title}>{el.exercise}</Text>
              </Actionsheet.Item>
            )
          })}
        </Actionsheet.Content>
      )}
    </Actionsheet>
  )
}

const styles = StyleSheet.create({
  title: { width: 200, color: DARK, fontSize: 18 },
})

export default BottomSheet
