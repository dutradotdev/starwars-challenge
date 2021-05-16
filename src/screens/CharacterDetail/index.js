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
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View style={{ flex: 1, marginLeft: 20, marginTop: 20 }}>
            <StarWarsAvatar
              hairColor={params?.item?.hair_color}
              gender={params?.item?.gender}
              skinColor={params?.item?.skinColor}
              size={300}
            />
          </View>
          <View
            style={{
              width: '100%',
              backgroundColor: '#65C9FF',
              flex: 1,
              padding: 20,
              borderTopRightRadius: 30,
              borderTopLeftRadius: 30,
            }}>
            <Text style={{ fontWeight: 'bold', fontSize: 22, marginBottom: 10, color: 'white' }}>
              Character description:
            </Text>
            <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10, color: 'white' }}>
              Height: {params?.item?.height}
            </Text>
            <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10, color: 'white' }}>
              Mass: {params?.item?.mass}
            </Text>
            <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10, color: 'white' }}>
              Birth Year: {params?.item?.birth_year}
            </Text>
            <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10, color: 'white' }}>
              Gender: {params?.item?.gender}
            </Text>
            <Image
              style={{
                width: 200,
                height: 200,
                position: 'absolute',
                bottom: -5,
                right: -50,
                transform: [{ rotate: '-30deg' }],
              }}
              source={Darth}
            />
          </View>
        </View>
      </SafeAreaView>
      <SafeAreaView style={{ backgroundColor: '#65C9FF' }}></SafeAreaView>
    </>
  )
}

export default Home
