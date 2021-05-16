import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

import styles from './styles'

const Error = ({ refetch = () => {} }) => {
  return (
    <View>
      <Text style={styles.title}>An error has occurred :(</Text>
      <TouchableOpacity onPress={() => refetch()} style={styles.textContainer}>
        <Text style={styles.title}>Try again </Text>
      </TouchableOpacity>
    </View>
  )
}

export default Error
