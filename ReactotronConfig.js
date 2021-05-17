import Reactotron from 'reactotron-react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const tron = Reactotron.setAsyncStorageHandler(AsyncStorage).configure().useReactNative().connect()

tron.clear()

console.tron = tron
