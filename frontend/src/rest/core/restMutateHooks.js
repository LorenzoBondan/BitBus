import { isNil } from 'ramda'
import { isFunction, isNotNil, isNotFunction } from 'ramda-adjunct'
import { useMutation, useQueryClient } from 'react-query'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useRestClient } from '../../state/restState'
import {
  isNotNilOrArray,
  isNotStringOrArrayOrFunction,
  isNotStringOrFunction,
  throwIf,
} from '../../utils/generalUtils'

export const useRestCreate = (restPath, options = {}) => {
  const { restClient } = useRestClient()
  return useRestMutate(restClient.makePostFn, restPath, options)
}

export const useRestUpdate = (restPath, options = {}) => {
  const { restClient } = useRestClient()
  return useRestMutate(restClient.makePutFn, restPath, options)
}

export const useRestPatch = (restPath, options = {}) => {
  const { restClient } = useRestClient()
  return useRestMutate(restClient.makePatchFn, restPath, options)
}

export const useRestDelete = (restPath, options = {}) => {
  const { restClient } = useRestClient()
  return useRestMutate(restClient.makeDeleteFn, restPath, options)
}

export const useRestMutate = (mutateFn, restPath, options = {}) => {
  const { mutationFnName, onSuccess = {}, onError = {}, baseUrl = '' } = options

  const axiosOptions = baseUrl ? { baseURL: baseUrl } : undefined

  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const res = useMutation(mutateFn(restPath, axiosOptions), {
    onSuccess: isFunction(onSuccess)
      ? onSuccess
      : _onMutateSuccess(queryClient, navigate, onSuccess),
    onError: isFunction(onError)
      ? onError
      : _onMutateError(queryClient, navigate, onError),
  })

  if (mutationFnName) {
    res[mutationFnName] = res?.mutate
    res[`${mutationFnName}Async`] = res?.mutateAsync
  }

  return res
}

const _getCacheId = (clientCacheId, entity) =>
  isFunction(clientCacheId) ? clientCacheId(entity) : clientCacheId

const _getRoute = (clientRoute, entity) =>
  isFunction(clientRoute) ? clientRoute(entity) : clientRoute

const _validateActionsList = (op, actions) => {
  throwIf(
    isNotNilOrArray(actions),
    `${op} - running actions: expected array for action list, but got ${actions}`
  )
  if (isNil(actions)) return
  actions.forEach((action) => {
    throwIf(isNotFunction(action), `${op} - Invalid action ${action}`)
  })
}

const _validateCacheList = (op, cacheList) => {
  throwIf(
    isNotNilOrArray(cacheList),
    `${op} - invalidating caches: expected array for cache list, but got ${cacheList}`
  )
  if (isNil(cacheList)) return
  cacheList.forEach((cacheId) => {
    throwIf(
      isNotStringOrArrayOrFunction(cacheId),
      `${op}: Invalid cache ID '${cacheId}`
    )
  })
}

const _onMutateSuccess =
  (queryClient, navigate, onSuccessOptions) => (data) => {
    const { cachesToInvalidate = [], cachesToRemove = [] } = onSuccessOptions
    const { routeTo, toastMessage, actions } = onSuccessOptions

    _validateActionsList('onMutateSuccess - running action functions', actions)
    if (actions) {
      actions.forEach((action) => {
        action()
      })
    }
    // Fist, remove caches, so they won't try to refetch upon invalidation
    _validateCacheList('onMutateSuccess - removing caches', cachesToRemove)
    const exact = true
    cachesToRemove.forEach((cacheToRemove) => {
      queryClient.removeQueries(_getCacheId(cacheToRemove, data), { exact })
    })

    // Next, invalidate any caches that currently exist
    _validateCacheList(
      'onMutateSuccess - invalidating caches',
      cachesToInvalidate
    )
    cachesToInvalidate.forEach((cacheToInvalidate) => {
      queryClient.invalidateQueries(_getCacheId(cacheToInvalidate, data))
    })

    // navigate if needed
    if (isNotNil(routeTo)) {
      throwIf(
        isNotStringOrFunction(routeTo),
        'invalid cache ID route for post query route to'
      )

      navigate(_getRoute(routeTo, data))
    }

    // Toast !
    if (isNotNil(toastMessage)) toast.success(toastMessage)
  }

const _onMutateError = (queryClient, navigate, onErrorOptions) => (error) => {
  const { toastMessage } = onErrorOptions
  console.error('Error: rest mutation failed', error)

  if (error.response?.data?.detail) toast.error(error.response.data.detail)
  else if (error.response?.data?.error) toast.error(error.response.data.error)
  else if (isNotNil(toastMessage)) toast.error(toastMessage)
}
