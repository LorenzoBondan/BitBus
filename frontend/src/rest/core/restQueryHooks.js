import { useQuery } from 'react-query'
import { assoc, omit } from 'ramda'
import { isNotUndefined, isUndefined } from 'ramda-adjunct'
import { useRestClient } from '../../state/restState'

const nonReactQueryOptions = [
  'queryParams',
  'pathParams',
  'baseUrl',
  'transformFn',
  'defaultResponse',
  'resultsPropName',
]

export const useRestQuery = (cacheId, restPath, options = {}) => {
  const { resultsPropName, transformFn, defaultResponse } = options
  const { queryParams, baseUrl = '', op = '' } = options
  const axiosOptions = baseUrl ? { baseURL: baseUrl } : undefined
  const useQueryOptions = omit(nonReactQueryOptions, options)
  const { restClient } = useRestClient()
  const res = useQuery(
    cacheId,
    restClient.makeGetFn(restPath, queryParams, axiosOptions),
    useQueryOptions
  )

  if (isUndefined(res?.data)) {
    return resultsPropName
      ? { ...res, data: defaultResponse, [resultsPropName]: defaultResponse }
      : { ...res, data: defaultResponse }
  }

  if (!resultsPropName && !transformFn) return res

  if (transformFn && !resultsPropName) {
    throw new Error(
      `usebaseRestClientQuery() ${op}: cant use transformFn without resultsPropName`
    )
  }

  return assoc(
    resultsPropName,
    transformFn && isNotUndefined(res?.data)
      ? transformFn(res?.data)
      : res?.data,
    res
  )
}
