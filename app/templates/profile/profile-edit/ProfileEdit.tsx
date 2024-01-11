import React, { FunctionComponent } from 'react'
import BottomSheet from '../../../components/ui/BottomSheet'
import { StyleSheet } from 'react-native'
import { IProfile } from '../../../providers/UserProvider'
import PEItem from './PEItem'
import { useUser } from '../../../hooks/useUser'

const ProfileEdit: FunctionComponent<{
  profile: IProfile
  onClose: () => void
  onOpen: () => void
  isOpen: boolean
}> = ({ profile, onClose, isOpen }) => {
  const { updateUserData, updateUserDataInfo } = useUser()
  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      <PEItem
        data={profile?.name}
        title={'Имя'}
        id={profile?.docId}
        name={'name'}
        update={updateUserData}
      />
      <PEItem
        data={profile?.lastName}
        title={'Фамилия'}
        id={profile?.docId}
        name={'lastName'}
        update={updateUserData}
      />
      <PEItem
        data={profile?.userInfo?.height}
        title={'Рост'}
        id={profile?.docId}
        name={'height'}
        update={updateUserDataInfo}
      />
      <PEItem
        data={profile?.userInfo?.weight}
        title={'Вес'}
        id={profile?.docId}
        name={'weight'}
        update={updateUserDataInfo}
      />
      <PEItem
        data={profile?.userInfo?.age}
        title={'Возраст'}
        id={profile?.docId}
        name={'age'}
        update={updateUserDataInfo}
      />
    </BottomSheet>
  )
}

const styles = StyleSheet.create({
  test: {
    fontSize: 20,
  },
})

export default ProfileEdit
