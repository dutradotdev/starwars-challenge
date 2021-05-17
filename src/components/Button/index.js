import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

import styles from './styles'

const Button = ({ onPress = () => {}, title, disabled = false, buttonStyle }) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[styles.textContainer, buttonStyle, disabled && styles.disabled]}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  )
}

export default Button
