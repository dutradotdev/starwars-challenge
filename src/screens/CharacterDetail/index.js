import React from 'react'
import { SafeAreaView, ScrollView, StatusBar, useColorScheme, View, Text } from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import styles from './styles'

const Home = () => {
  const isDarkMode = useColorScheme() === 'dark'

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  }

  return (
    <SafeAreaView style={styles.backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView contentInsetAdjustmentBehavior='automatic' style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Text>Character Detail!!!!</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home
