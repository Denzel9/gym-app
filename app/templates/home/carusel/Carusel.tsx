import { FunctionComponent } from 'react'
import CaruselItem from './CaruselItem'
import { ScrollView, StyleSheet, View } from 'react-native'

const Carusel: FunctionComponent<{ name: string; img: string }> = ({ name, img }) => {
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      alwaysBounceVertical={false}
      showsHorizontalScrollIndicator={false}
    >
      <CaruselItem text={'denis'} img={img} />
      <CaruselItem text={name} img={img} />
      <CaruselItem text={name} img={img} />
      <CaruselItem text={name} img={img} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    gap: 20,
    flexDirection: 'row',
    color: '#FFF',
    alignItems: 'center',
  },
  title: {
    fontSize: 25,
  },
})

export default Carusel
