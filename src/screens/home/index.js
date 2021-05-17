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
import Button from '../../components/Button'
import Error from '../../components/Error'
import useGetPeopleWithPagination from '../../hooks/useGetPeopleWithPagination'
import useGetHomeWorlds from '../../hooks/useGetHomeWorlds'

import styles from './styles'

const Home = () => {
  const navigation = useNavigation()
  const [
    { people: peopleData, loading: peopleLoading, error: peopleError },
    getPeople,
    nextPage,
    previousPage,
    hasNextPage,
    hasPreviousPage,
    currentPage,
  ] = useGetPeopleWithPagination()
  const [
    { homeWorlds: homeWorldsData, loading: homeWorldsLoading, error: homeWorldsError },
    getHomeWorlds,
  ] = useGetHomeWorlds()

  useEffect(() => {
    getPeople()
  }, [])

  useEffect(() => {
    getHomeWorlds(peopleData)
  }, [peopleData])

  const ListItem = ({ item }) => (
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
        {!!homeWorldsData[item?.homeworld] && (
          <Text style={styles.subtitle}>Planet: {homeWorldsData[item?.homeworld]}</Text>
        )}
      </View>
    </TouchableOpacity>
  )

  const PaginationButtons = () => (
    <View style={styles.paginationContainer}>
      <View style={styles.paginationButtonContainer}>
        <Button
          disabled={!hasPreviousPage}
          onPress={previousPage}
          title='Previous'
          buttonStyle={{ marginRight: 20 }}
        />
        <Button disabled={!hasNextPage} onPress={nextPage} title='Next' />
      </View>
      <Text style={styles.title}>Page: {currentPage}</Text>
    </View>
  )

  const CharacterList = () => (
    <FlatList
      style={styles.flatListContainer}
      scrollEnabled={true}
      data={peopleData}
      keyExtractor={(item) => item?.name}
      showsVerticalScrollIndicator={false}
      ListFooterComponent={PaginationButtons}
      renderItem={({ item }) => <ListItem item={item} />}
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
