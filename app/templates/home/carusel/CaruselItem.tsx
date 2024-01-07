import { FunctionComponent } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

const CaruselItem: FunctionComponent<{ text: string; img: string }> = ({ text, img }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>С возвращение,</Text>
      <Text style={styles.subTitle}>{text}</Text>
      {img ? (
        <Image source={{ uri: '' }} />
      ) : (
        <View style={styles.imageBox}>
          <Text style={styles.imageBoxtext}>{text.slice(0, 1)}</Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    width: 200,
    height: 75,
    borderRadius: 20,
    position: 'relative',
    backgroundColor: '#383737',
    borderColor: '#e8aa00',
    borderWidth: 1,
  },
  title: {
    fontSize: 15,
    color: '#fff',
  },
  subTitle: {
    fontSize: 12,
    color: '#fff',
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 100,
    position: 'absolute',
    right: 5,
    top: 5,
  },
  imageBox: {
    width: 30,
    height: 30,
    borderRadius: 100,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 5,
    right: 5,
  },
  imageBoxtext: {
    textTransform: 'uppercase',
  },
})

export default CaruselItem
