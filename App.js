/* global __DEV__ */
import React from 'react'
import 'react-native-gesture-handler'
import Router from './src/router'

if (__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'))
}

const App = () => <Router />

export default App
