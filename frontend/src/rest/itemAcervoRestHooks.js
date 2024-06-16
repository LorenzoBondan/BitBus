import { useRestQuery } from './core/restQueryHooks'
import { useRestDelete } from './core/restMutateHooks'
import { propOr } from 'ramda'

export const useGetItens = (options = {}) => {
  const { defaultResponse = { content: [] }, resultsPropName = 'itens' } =
    options
  const restPath = '/itens'
  const queryCacheKey = 'itens'
  return useRestQuery(queryCacheKey, restPath, {
    resultsPropName,
    defaultResponse: defaultResponse || { [resultsPropName]: [] },
    ...options,
  })
}

export const useGetItemById = (itemId, options = {}) => {
  const { defaultResponse = [], resultsPropName = 'item' } = options
  const restPath = `/itens/${itemId}`
  const queryCacheKey = ['intes', itemId]
  return useRestQuery(queryCacheKey, restPath, {
    resultsPropName,
    defaultResponse: defaultResponse || { [resultsPropName]: [] },
    ...options,
  })
}

export const useDeleteItem = (options = {}) => {
  const restPath = '/itens/:idItem'
  const mutationFnName = 'deleteItem'

  const onSuccess = {
    cachesToInvalidate: [['itens']],
    cachesToRemove: [(item) => ['itens', item?.id]],
    ...propOr({}, 'onSuccess', options), // caller options
  }

  const onError = {
    ...propOr({}, 'onError', options), // caller options
  }

  const deleteOptions = { onSuccess, onError }
  const res = useRestDelete(restPath, deleteOptions)

  return {
    ...res,
    [mutationFnName]: (idItem) => res.mutate({ pathParams: { idItem } }),
    [`${mutationFnName}Async`]: (idItem) =>
      res.mutateAsync({ pathParams: { idItem } }),
  }
}
