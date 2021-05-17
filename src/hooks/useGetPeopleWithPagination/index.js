import { useEffect, useState } from 'react'
import axios from 'axios'
import orderByField from '../../utils/orderByField'

const useGetPeopleWithPagination = () => {
  const [people, setPeople] = useState([])
  const [loading, setLoading] = useState([])
  const [error, setError] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [hasNextPage, setHasNextPage] = useState(true)
  const [hasPreviousPage, setHasPreviousPage] = useState(false)

  useEffect(() => {
    getPeople()
  }, [currentPage])

  const getPeople = async () => {
    try {
      setLoading(true)

      const { data } = await axios.get(`http://swapi.dev/api/people/?page=${currentPage}`)
      setHasNextPage(!!data?.next)
      setHasPreviousPage(!!data?.previous)

      const orderedData = orderByField(data?.results, 'name')
      setPeople(orderedData)
      return data
    } catch (e) {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  const nextPage = () => {
    if (!hasNextPage) {
      return
    }
    setCurrentPage((currentPage) => currentPage + 1)
  }

  const previousPage = () => {
    if (!hasPreviousPage) {
      return
    }

    setCurrentPage((currentPage) => currentPage - 1)
  }

  return [
    { people, loading, error },
    getPeople,
    nextPage,
    previousPage,
    hasNextPage,
    hasPreviousPage,
    currentPage,
  ]
}

export default useGetPeopleWithPagination
