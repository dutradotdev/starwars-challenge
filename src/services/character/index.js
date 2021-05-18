import axios from '../config/axios'
const getCharacter = async (page) => {
  const data = await axios.get(`/people/?page=${page}`)
  return data
}

export default getCharacter
