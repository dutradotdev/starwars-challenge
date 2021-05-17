import React from 'react'
import { Avatar } from 'react-native-avataaars'

const StarWarsAvatar = ({ size, hairColor, gender, skinColor }) => {
  const getHairColor = (hairColor) => {
    switch (hairColor?.split(',')[0]) {
      case 'blond':
        return 'Blonde'
      case 'black':
        return 'Black'
      case 'brown':
        return 'Brown'
      case 'auburn':
        return 'Brown'
      case 'white':
        return 'White'
      case 'unknown':
      case 'n/a':
      case 'none':
        return 'NoHair'
      default:
        return 'Blonde'
    }
  }

  const getSkinColor = (skinColor) => {
    switch (skinColor?.split(',')[0]) {
      case 'fair':
        return 'Pale'
      case 'gold':
        return 'Yellow'
      case 'white':
        return 'Light'
      case 'light':
        return 'Light'
    }
  }

  const getHairType = (hairColor, gender) => {
    if (getHairColor(hairColor) === 'NoHair') {
      return 'Hat'
    }

    return gender === 'female' ? 'LongHairStraightStrand' : 'ShortHairShortRound'
  }

  return (
    <Avatar
      size={size}
      topType={getHairType(hairColor, gender)}
      hairColor={getHairColor(hairColor)}
      skinColor={getSkinColor(skinColor)}
      avatarStyle='Circle'
      accessoriesType='Prescription02'
      facialHairType='Blank'
      clotheType='BlazerShirt'
      eyeType='Wink'
      eyebrowType='Default'
      mouthType='Default'
    />
  )
}

export default StarWarsAvatar
