import React, { useState, useEffect } from 'react'
import {
  SafeAreaView,
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
} from 'react-native'
import { useNavigation } from '@react-navigation/core'

import axios from 'axios'
import StarWarsAvatar from '../../components/StarWarsAvatar'
import Error from '../../components/Error'
import orderByField from '../../utils/orderByField'
import styles from './styles'

const Home = () => {
  const navigation = useNavigation()
  const [homeworlds, setHomeworlds] = useState({})
  const [people, setPeople] = useState([])
  const [loading, setLoading] = useState([])
  const [error, setError] = useState(false)

  const getPeople = async () => {
    const { data } = await axios.get('http://swapi.dev/api/people/')
    const orderedData = orderByField(data?.results, 'name')
    setPeople(orderedData)
    return data
  }

  useEffect(() => {
    const getPeopleAndHomeworlds = async () => {
      try {
        setLoading(true)
        const data = await getPeople()
        const homeworlds = data.results.map((item) => item.homeworld)
        const uniqueHomeWorlds = Array.from(new Set(homeworlds))
        const homeWorldsData = await Promise.all(
          uniqueHomeWorlds.map(async (endpoint) => {
            const { data } = await axios.get(endpoint)

            return {
              [endpoint]: data?.name,
            }
          })
        )
        const reduced = homeWorldsData.reduce((acc, cur) => {
          acc[Object.keys(cur)[0]] = Object.values(cur)[0]
          return acc
        }, {})
        setHomeworlds({ ...reduced })
      } catch (e) {
        console.log(JSON.stringify(e))
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    getPeopleAndHomeworlds()
  }, [])

  const CharacterList = () => (
    <FlatList
      style={styles.flatListContainer}
      scrollEnabled={true}
      data={people}
      keyExtractor={(item) => item?.name}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => (
        <TouchableOpacity
          key={item?.name}
          onPress={() =>
            navigation.navigate('CharacterDetail', {
              item,
            })
          }
          style={styles.cardContainer}>
          <View style={styles.avatarContainer}>
            <StarWarsAvatar
              hairColor={item?.hair_color}
              gender={item?.gender}
              skinColor={item?.skinColor}
              size={200}
            />
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.title}>Name: {item?.name}</Text>
            <Text style={styles.subtitle}>Planet: {homeworlds[item?.homeworld]}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  )

  return (
    <SafeAreaView style={styles.container}>
      {loading && <ActivityIndicator animating color='#AD7D37' size='large' />}
      {error && <Error refetch={getPeople} />}
      {!error && !loading && CharacterList()}
    </SafeAreaView>
  )
}

export default Home
