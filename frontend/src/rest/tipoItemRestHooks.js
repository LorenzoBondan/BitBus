import { useRestQuery } from './core/restQueryHooks'
import {
  useRestDelete,
  useRestCreate,
  useRestUpdate,
} from './core/restMutateHooks'
import { propOr } from 'ramda'

export const useGetTiposItem = (options = {}) => {
  const { defaultResponse = { content: [] }, resultsPropName = 'tiposItem' } =
    options
  const restPath = '/tipoItens'
  const queryCacheKey = 'tiposItem'
  return useRestQuery(queryCacheKey, restPath, {
    resultsPropName,
    defaultResponse: defaultResponse || { [resultsPropName]: [] },
    ...options,
  })
}

export const useGetTipoItemById = (tipoItemId, options = {}) => {
  const { defaultResponse = [], resultsPropName = 'tipoItem' } = options
  const restPath = `/tipoItens/${tipoItemId}`
  const queryCacheKey = ['tiposItem', tipoItemId]
  return useRestQuery(queryCacheKey, restPath, {
    resultsPropName,
    defaultResponse: defaultResponse || { [resultsPropName]: [] },
    ...options,
  })
}

export const useDeleteTipoItem = (options = {}) => {
  const restPath = '/tipoItens/:tipoItemId'
  const mutationFnName = 'deleteTipoItem'

  const onSuccess = {
    toastMessage: 'Tipo deletado!',
    cachesToInvalidate: [['tiposItem']],
    cachesToRemove: [(tipo) => ['tiposItem', tipo?.id]],
    ...propOr({}, 'onSuccess', options), // caller options
  }

  const onError = {
    toastMessage: 'Falha ao deletar tipo!',
    ...propOr({}, 'onError', options), // caller options
  }

  const deleteOptions = { onSuccess, onError }
  const res = useRestDelete(restPath, deleteOptions)

  return {
    ...res,
    [mutationFnName]: (tipoItemId) =>
      res.mutate({ pathParams: { tipoItemId } }),
    [`${mutationFnName}Async`]: (tipoItemId) =>
      res.mutateAsync({ pathParams: { tipoItemId } }),
  }
}

export const useCreateTipoItem = (options = {}) => {
  const restPath = '/tipoItens'
  const mutationFnName = 'createTipoItem'

  const onSuccess = {
    cachesToInvalidate: ['tiposItem'],
    toastMessage: 'Tipo criado!',
    ...propOr({}, 'onSuccess', options), // caller options
  }

  const onError = {
    toastMessage: 'Falha ao criar tipo!',
    ...propOr({}, 'onError', options), // caller options
  }

  const createOptions = { onSuccess, onError }
  const res = useRestCreate(restPath, createOptions)
  return {
    ...res,
    [mutationFnName]: (data, params) => res.mutate({ data, params }),
    [`${mutationFnName}Async`]: (data, params) =>
      res.mutateAsync({ data, params }),
  }
}

export const useUpdateTipoItem = (tipoItemId, options = {}) => {
  const restPath = `/tipoItens/${tipoItemId}`
  const mutationFnName = 'updateTipoItem'

  const onSuccess = {
    cachesToInvalidate: ['tiposItem'],
    toastMessage: 'Tipo atualizado!',
    ...propOr({}, 'onSuccess', options), // caller options
  }

  const onError = {
    toastMessage: 'Falha ao alterar tipo!',
    ...propOr({}, 'onError', options), // caller options
  }

  const updateOptions = { mutationFnName, onSuccess, onError }
  const res = useRestUpdate(restPath, updateOptions)
  return {
    ...res,
    [mutationFnName]: (data, params) => res.mutate({ data, params }),
    [`${mutationFnName}Async`]: (data, params) =>
      res.mutateAsync({ data, params }),
  }
}
