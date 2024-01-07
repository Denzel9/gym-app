import { FunctionComponent, useState } from 'react'
import { Pressable, StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import Layout from '../../components/Layout/Layout'
import Loader from '../../components/ui/Loader'
import Field from '../../components/ui/Field'
import HeaderText from '../../components/ui/HeaderText'
import { DARK, GOLD, WHITE } from '../../consts/colors'
import { useAuth } from '../../hooks/useAuth'

interface IData {
  email: string
  password: string
}

const AuthPage: FunctionComponent = () => {
  const { isLoading, register, login } = useAuth()

  const [isReg, setIsReg] = useState(false)
  const [data, setData] = useState<IData>({} as IData)

  const authHandler = async () => {
    const { email, password } = data
    if (isReg) await register(email, password)
    else await login(email, password)
    setData({} as IData)
  }

  const handleChangeIsReg = () => {
    setData({} as IData)
    setIsReg(!isReg)
  }
  return (
    <Layout>
      <View>
        {isLoading ? (
          <Loader />
        ) : (
          <View style={styles.container}>
            <HeaderText title={isReg ? 'Зарегистрироваться' : 'Войти'} />
            <Field
              value={data.email}
              onChange={(value) => setData({ ...data, email: value })}
              placeholder={'Введите логин'}
            />
            <Field
              value={data.password}
              onChange={(value) => setData({ ...data, password: value })}
              placeholder={'Введите пароль'}
              isSecure
            />
            <TouchableHighlight style={styles.button} onPress={authHandler} underlayColor={GOLD}>
              <Text style={styles.buttonText}>Отправить</Text>
            </TouchableHighlight>
            <Pressable onPress={handleChangeIsReg} style={{ width: '100%' }}>
              <Text style={styles.isRegText}> {isReg ? 'Войти' : 'Зарегистрироваться'}</Text>
            </Pressable>
          </View>
        )}
      </View>
    </Layout>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '90%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: DARK,
    width: '100%',
    borderColor: GOLD,
    borderWidth: 1,
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: WHITE,
  },
  isRegText: {
    color: WHITE,
    textAlign: 'right',
    marginTop: 10,
    opacity: 0.5,
  },
})

export default AuthPage
