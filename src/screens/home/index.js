import React, { useEffect } from 'react'
import {
  SafeAreaView,
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
} from 'react-native'
import { useNavigation } from '@react-navigation/core'

import StarWarsAvatar from '../../components/StarWarsAvatar'
import Error from '../../components/Error'
import useGetPeople from '../../hooks/useGetPeople'
import useGetHomeWorlds from '../../hooks/useGetHomeWorlds'

import styles from './styles'

const Home = () => {
  const navigation = useNavigation()
  const [{ people: peopleData, loading: peopleLoading, error: peopleError }, getPeople] =
    useGetPeople()
  const [
    { homeWorlds: homeWorldsData, loading: homeWorldsLoading, error: homeWorldsError },
    getHomeWorlds,
  ] = useGetHomeWorlds()

  useEffect(() => {
    const getPeopleAndHomeworlds = async () => {
      const data = await getPeople()
      getHomeWorlds(data?.results)
    }
    getPeopleAndHomeworlds()
  }, [])

  const CharacterList = () => (
    <FlatList
      style={styles.flatListContainer}
      scrollEnabled={true}
      data={peopleData}
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
            <Text style={styles.subtitle}>Planet: {homeWorldsData[item?.homeworld]}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  )

  return (
    <SafeAreaView style={styles.container}>
      {(peopleLoading || homeWorldsLoading) && (
        <ActivityIndicator animating color='#AD7D37' size='large' />
      )}
      {(peopleError || homeWorldsError) && <Error refetch={getPeople} />}
      {!homeWorldsError && !homeWorldsLoading && !peopleLoading && !peopleError && CharacterList()}
    </SafeAreaView>
  )
}

export default Home
