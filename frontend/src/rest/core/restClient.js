import axios from 'axios'
import { keys } from 'ramda'
import { isNilOrEmpty, isNotObject, isString } from 'ramda-adjunct'
import {
  throwIf,
  isNotStringOrNumber,
  isNotStringOrNumberOrBool,
  isNotNilOrObject,
  isNotNilOrStringOrObject,
} from '../../utils/generalUtils'

export const makeRestClient = (serverConfig) => {
  let restClient = {
    serverConfig,
    axiosClient: axios.create({
      baseURL: serverConfig?.defaultBaseUrl,
      timeout: serverConfig?.timeout || 5000,
    }),
  }

  let refreshTokenAxiosClient = axios.create({
    baseURL: serverConfig?.defaultBaseUrl,
    timeout: serverConfig?.timeout || 5000,
  })

  // rest actions
  restClient.get = (...args) => restClient.axiosClient.get(...args)
  restClient.post = (...args) => restClient.axiosClient.post(...args)
  restClient.put = (...args) => restClient.axiosClient.put(...args)
  restClient.patch = (...args) => restClient.axiosClient.patch(...args)
  restClient.delete = (...args) => restClient.axiosClient.delete(...args)

  restClient.makeGetFn = (restPath, queryParams, axiosOptions) => () =>
    restClient.get(_expandRestPath(restPath, { queryParams }), axiosOptions)

  restClient.makePostFn =
    (restPath, axiosOptions) =>
    ({ data, params }) =>
      restClient.post(_expandRestPath(restPath, params), data, axiosOptions)

  restClient.makePutFn =
    (restPath, axiosOptions) =>
    ({ data, params }) =>
      restClient.put(_expandRestPath(restPath, params), data, axiosOptions)

  restClient.makePatchFn =
    (restPath, axiosOptions) =>
    ({ data, params }) =>
      restClient.patch(_expandRestPath(restPath, params), data, axiosOptions)

  restClient.makeDeleteFn = (restPath, axiosOptions) => (params) =>
    restClient.delete(_expandRestPath(restPath, params), axiosOptions)

  /*
    middlewares
  */

  restClient.axiosClient.interceptors.request.use(
    _requestPreprocessor({
      verbose: !!serverConfig?.verbose,
    })
  )

  refreshTokenAxiosClient.interceptors.request.use(
    _requestPreprocessor({
      verbose: !!serverConfig?.verbose,
    })
  )

  restClient.axiosClient.interceptors.response.use(
    _responsePostProcessor(serverConfig?.verbose)
  )

  return restClient
}

//*****************************************************************************
// Module Only Stuff
//*****************************************************************************

const _requestPreprocessor =
  (opts = {}) =>
  (req = {}) => {
    const { verbose } = opts
    const { method, baseURL, url, data } = req
    if (verbose) {
      console.debug(`\n${method} (new) ${baseURL}${url}`)
      if (data) console.debug('body', data)
    }
    return req
  }

const _responsePostProcessor =
  (verbose = false) =>
  (rsp = {}) => {
    const { data, status, statusText } = rsp
    if (verbose) console.debug(`response: ${status} ${statusText} `, data || '')

    return data
  }

export const _expandRestPath = (restPath, params) => {
  if (isNilOrEmpty(params)) return restPath
  throwIf(isNotObject(params), 'expandUrl(): non object supplied for params')

  const { pathParams, queryParams } = params

  if (isNilOrEmpty(pathParams) && isNilOrEmpty(queryParams)) return restPath
  throwIf(
    isNotNilOrObject(pathParams),
    'expandUrl(): non object supplied for pathParams'
  )
  throwIf(
    isNotNilOrStringOrObject(queryParams),
    'expandUrl(): non object supplied for queryParams'
  )

  let expandedPath = restPath

  // insert path params
  if (pathParams) {
    expandedPath = keys(pathParams).reduce((accumPath, paramKey) => {
      const paramValue = pathParams[paramKey]
      throwIf(
        isNotStringOrNumber(paramValue),
        'expandRestPath(): param value is not a string or number'
      )
      const regExParamKey = new RegExp(`:${paramKey}`, 'g')
      return accumPath.replace(regExParamKey, String(paramValue))
    }, expandedPath)
  }

  // append query params
  if (queryParams) {
    expandedPath = isString(queryParams)
      ? expandedPath + queryParams
      : keys(queryParams).reduce((accumPath, queryKey, idx) => {
          const queryValue = queryParams[queryKey]
          throwIf(
            isNotStringOrNumberOrBool(queryValue),
            'expandRestPath(): query value is not a string or number or bool'
          )
          return (
            accumPath +
            `${idx === 0 ? '?' : '&'}${String(queryKey)}=${String(queryValue)}`
          )
        }, expandedPath)
  }
  return expandedPath
}
