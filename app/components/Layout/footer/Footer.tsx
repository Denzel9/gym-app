import React, { FunctionComponent } from 'react'
import { View } from 'react-native'
import { menu } from './menu.data'
import FooterItem from './FooterItem'
import { TypeRootStackParamsList } from '../../navigation/types.navigation'

const Footer: FunctionComponent<{
  navigate: (screenName: keyof TypeRootStackParamsList) => void
  currentRoute?: string
}> = ({ navigate, currentRoute }) => {
  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'space-around',
        flexDirection: 'row',
        paddingBottom: 20,
        borderStyle: 'solid',
        backgroundColor: '#383737',
        borderColor: '#383838',
        borderTopWidth: 1,
        borderRightWidth: 1,
        borderLeftWidth: 1,
        width: '102%',
        marginLeft: '-1%',
      }}
    >
      {menu.map((el) => {
        return (
          <FooterItem
            key={el.title}
            iconName={el.iconName}
            title={el.title}
            navigate={navigate}
            currentRoute={currentRoute}
          />
        )
      })}
    </View>
  )
}

export default Footer
