import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Home from '../screens/Home'
import CharacterDetail from '../screens/CharacterDetail'

const Stack = createStackNavigator()

function Router() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='CharacterDetail' component={CharacterDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Router
