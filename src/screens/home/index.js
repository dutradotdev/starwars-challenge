import React from 'react'
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
  View,
  Text,
  TouchableOpacity,
} from 'react-native'
import { Colors, Header } from 'react-native/Libraries/NewAppScreen'
import { useNavigation } from '@react-navigation/core'
import styles from './styles'

const Home = () => {
  const isDarkMode = useColorScheme() === 'dark'
  const navigation = useNavigation()

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  }

  return (
    <SafeAreaView style={styles.backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView contentInsetAdjustmentBehavior='automatic' style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Text>Home</Text>
          <TouchableOpacity onPress={() => navigation.navigate('CharacterDetail')}>
            <Text>Ir para CharacterDetail</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home
