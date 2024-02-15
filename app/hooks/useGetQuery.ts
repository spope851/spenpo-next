import { useSearchParams } from 'next/navigation'

export const useGetQuery = () => {
  const searchParams = useSearchParams()
  const params = searchParams ? Array.from(searchParams) : []

  return Object.values(params).reduce((p: string, [key, val]) => {
    p += `&${key}=${val}`
    return p
  }, '')
}
