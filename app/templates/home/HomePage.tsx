import { FunctionComponent, useContext } from 'react'
import { StyleSheet, View } from 'react-native'
import Layout from '../../components/Layout/Layout'
import Carusel from './carusel/Carusel'
import HomeBox from './HomeBox'
import { useTraining } from '../../hooks/useTraining'
import { TODAY, TOMORROW } from '../../helpers/getDate'
import { UserContext } from '../../providers/UserProvider'
import { useUser } from '../../hooks/useUser'

const HomePage: FunctionComponent = () => {
  const { fullUserInfo } = useUser()
  const { todayTraining, nextTraining } = useTraining()

  const isTrainingDay = () => {
    if (todayTraining?.training?.length) return todayTraining?.date === TODAY && 'Сегодня'
    if (!todayTraining?.training?.length)
      return nextTraining?.date === TOMORROW ? 'Завтра' : nextTraining?.date
  }

  return (
    <Layout>
      <View style={styles.container}>
        <Carusel name={''} img={''} />

        {!fullUserInfo() && (
          <HomeBox title="Запоните информацию о себе" link={'Profile'} titleButton={'Перейти'} />
        )}

        {todayTraining?.training.length ? (
          <HomeBox
            title="Следующая тренировка:"
            link={'Training'}
            titleButton={'Начать'}
            isDate={isTrainingDay}
          />
        ) : nextTraining?.training.length ? (
          <HomeBox
            title="Следующая тренировка:"
            link={'Calendar'}
            titleButton={'Посмотреть'}
            params={{ params: 4 }}
            isDate={isTrainingDay}
          />
        ) : (
          <HomeBox
            title="Тренировка не запланирована"
            link={'Calendar'}
            titleButton={'Запланировать'}
            isDate={isTrainingDay}
          />
        )}
      </View>
    </Layout>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    color: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    borderColor: '#e8aa00',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 30,
    position: 'absolute',
    left: 10,
    marginTop: 10,
  },
})

export default HomePage
