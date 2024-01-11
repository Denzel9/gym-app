import { FunctionComponent, useContext } from 'react'
import { Pressable, Text, View } from 'react-native'
import Layout from '../../components/Layout/Layout'
import { UserContext } from '../../providers/UserProvider'
import { useTraining } from '../../hooks/useTraining'
import Loader from '../../components/ui/Loader'
import ProfileInfo from './profile-info/ProfileInfo'
import { useNavigation } from '@react-navigation/native'
import Button from '../../components/ui/Button'
import { UseNavigationProp } from '../../components/navigation/types.navigation'
import { useDisclose } from 'native-base'

import ProfileEdit from './profile-edit/ProfileEdit'

const ProfilePage: FunctionComponent = () => {
  const { isLoading, profile } = useContext(UserContext)
  const { lastTraining, nextTraining } = useTraining()
  const { navigate } = useNavigation<UseNavigationProp>()
  const { isOpen, onOpen, onClose } = useDisclose()
  console.log(lastTraining)
  return (
    <Layout>
      {isLoading && <Loader />}
      <ProfileInfo
        lastTraining={lastTraining?.date!}
        nextTraining={nextTraining?.date!}
        name={profile?.name}
        email={profile?.email}
        lastName={profile?.lastName}
      />

      <Button title={'Личная информация'} onPress={onOpen} />
      {lastTraining?.date && (
        <Button
          title={'Отчет о последней тренировке'}
          onPress={() => navigate('LastTrainingReport', { date: lastTraining?.date! })}
        />
      )}
      <Button title={'Расписание'} onPress={() => navigate('Calendar', { params: 0 })} />
      <Button title={'Рекорды'} onPress={() => navigate('Calendar', { params: 0 })} />
      <ProfileEdit profile={profile} onClose={onClose} onOpen={onOpen} isOpen={isOpen} />
    </Layout>
  )
}

export default ProfilePage
