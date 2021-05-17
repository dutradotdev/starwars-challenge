import React, { useLayoutEffect } from 'react'
import { SafeAreaView, View, Text, Image } from 'react-native'
import { useNavigation } from '@react-navigation/core'

import Darth from '../../assets/darth.png'
import StarWarsAvatar from '../../components/StarWarsAvatar'
import styles from './styles'

const Home = ({ route }) => {
  const params = route?.params
  const navigation = useNavigation()

  useLayoutEffect(() => {
    navigation.setOptions({
      title: params?.item?.name,
    })
  }, [])

  return (
    <>
      <SafeAreaView style={styles.backgroundStyle}>
        <View style={styles.container}>
          <View style={styles.avatarContainer}>
            <StarWarsAvatar
              hairColor={params?.item?.hair_color}
              gender={params?.item?.gender}
              skinColor={params?.item?.skinColor}
              size={300}
            />
          </View>
          <View style={styles.footerContainer}>
            <Text style={styles.title}>Character description:</Text>
            <Text style={styles.item}>Height: {params?.item?.height}</Text>
            <Text style={styles.item}>Mass: {params?.item?.mass}</Text>
            <Text style={styles.item}>Birth Year: {params?.item?.birth_year}</Text>
            <Text style={styles.item}>Gender: {params?.item?.gender}</Text>
            <Text style={styles.item}>Hair color: {params?.item?.hair_color}</Text>
            <Text style={styles.item}>Skin color: {params?.item?.skin_color}</Text>
            <Image style={styles.image} source={Darth} />
          </View>
        </View>
      </SafeAreaView>
      <SafeAreaView style={styles.footerSafeArea}></SafeAreaView>
    </>
  )
}

export default Home
