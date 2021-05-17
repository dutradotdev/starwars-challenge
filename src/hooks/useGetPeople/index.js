import { useState } from 'react'
import axios from 'axios'
import orderByField from '../../utils/orderByField'

const useGetPeople = () => {
  const [people, setPeople] = useState([])
  const [loading, setLoading] = useState([])
  const [error, setError] = useState(false)

  const getPeople = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get('http://swapi.dev/api/people/')
      const orderedData = orderByField(data?.results, 'name')
      setPeople(orderedData)
      return data
    } catch (e) {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  return [{ people, loading, error }, getPeople]
}

export default useGetPeople
