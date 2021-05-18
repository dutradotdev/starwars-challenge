import React, { useEffect } from 'react'
import {
  SafeAreaView,
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native'
import { useNavigation } from '@react-navigation/core'

import Logo from '../../assets/logo.png'
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
    getHomeWorlds(peopleData)
  }, [peopleData])

  const handleOnPress = (item) => {
    navigation.navigate('CharacterDetail', {
      item,
    })
  }

  const ListItem = ({ item }) => (
    <TouchableOpacity
      key={item?.name}
      onPress={() => handleOnPress(item)}
      style={styles.cardContainer}>
      <View style={styles.avatarContainer}>
        {!!homeWorldsData[item?.homeworld] && (
          <Image style={styles.logo} resizeMode='contain' source={Logo} />
        )}
      </View>
      <View style={styles.descriptionContainer}>
        {!!homeWorldsData[item?.homeworld] && (
          <>
            <Text style={styles.title}>Name: {item?.name}</Text>
            <Text style={styles.subtitle}>Planet: {homeWorldsData[item?.homeworld]}</Text>
          </>
        )}
      </View>
    </TouchableOpacity>
  )

  const PaginationButtons = () => (
    <>
      {!peopleError && !homeWorldsError && (
        <View style={styles.paginationContainer}>
          <View style={styles.paginationButtonContainer}>
            <Button
              disabled={!hasPreviousPage}
              onPress={previousPage}
              title='Previous'
              buttonStyle={styles.buttonRight}
            />
            <Button disabled={!hasNextPage} onPress={nextPage} title='Next' />
          </View>
          <Text style={[styles.title, styles.withMargin]}>Page: {currentPage}</Text>
        </View>
      )}
    </>
  )

  const renderItem = ({ item }) => <ListItem item={item} />
  const keyExtractor = (item) => item?.name

  const CharacterList = () => (
    <FlatList
      style={styles.flatListContainer}
      data={peopleData}
      showsVerticalScrollIndicator={false}
      keyExtractor={keyExtractor}
      ListFooterComponent={PaginationButtons}
      renderItem={renderItem}
      scrollEnabled
    />
  )

  return (
    <SafeAreaView style={styles.container}>
      {(peopleLoading || homeWorldsLoading) && (
        <ActivityIndicator animating color='#AD7D37' size='large' />
      )}
      {(peopleError || homeWorldsError) && <Error refetch={getPeople} />}
      {!homeWorldsLoading && !peopleLoading && !peopleError && !homeWorldsError && (
        <CharacterList />
      )}
    </SafeAreaView>
  )
}

export default Home
