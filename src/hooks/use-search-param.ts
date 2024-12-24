import { parseAsString, useQueryState } from 'nuqs'

export const useSearchParam = (key: string = 'search') => {
  return useQueryState(key, parseAsString.withDefault('').withOptions({ clearOnDefault: true }))
}
