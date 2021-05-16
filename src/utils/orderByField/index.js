const orderByField = (arr, field) => {
  return arr.sort((a, b) => (a[field] === b[field] ? 0 : a[field] < b[field] ? -1 : 1))
}

export default orderByField
