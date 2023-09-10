export const getQueryParams = (query: OptionalRecord<string, string>) => {
  const searchParams = new URLSearchParams(window.location.search)
  Object.entries(query).forEach(([name, value]) => {
    if (value !== undefined) {
      searchParams.set(name, value)
    }
  })
  return `?${searchParams.toString()}`
}
export const addQueryParams = (query: OptionalRecord<string, string>) => {
  window.history.pushState(null, '', `${getQueryParams(query)}`)
}
