import { useState } from 'react'
import axios from 'axios'

const useGetHomeWorlds = () => {
  const [homeWorlds, setHomeWorlds] = useState({})
  const [loading, setLoading] = useState([])
  const [error, setError] = useState(false)

  const getHomeWorlds = async (characterList) => {
    try {
      const homeworlds = characterList.map((item) => item.homeworld)
      const uniqueHomeWorlds = Array.from(new Set(homeworlds))
      const homeWorldsData = await Promise.all(
        uniqueHomeWorlds.map(async (endpoint) => {
          const { data } = await axios.get(endpoint)

          return {
            [endpoint]: data?.name,
          }
        })
      )
      const reduced = homeWorldsData.reduce((acc, cur) => {
        acc[Object.keys(cur)[0]] = Object.values(cur)[0]
        return acc
      }, {})
      setHomeWorlds({ ...reduced })
    } catch (e) {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  return [{ homeWorlds, loading, error }, getHomeWorlds]
}

export default useGetHomeWorlds
