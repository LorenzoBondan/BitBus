import { useRestQuery } from './core/restQueryHooks'
import {
  useRestDelete,
  useRestCreate,
  useRestUpdate,
} from './core/restMutateHooks'
import { propOr } from 'ramda'

export const useGetMemorias = (options = {}) => {
  const { defaultResponse = { content: [] }, resultsPropName = 'memorias' } =
    options
  const restPath = '/memorias'
  const queryCacheKey = 'memorias'
  return useRestQuery(queryCacheKey, restPath, {
    resultsPropName,
    defaultResponse: defaultResponse || { [resultsPropName]: [] },
    ...options,
  })
}

export const useGetMemoriaById = (memoriaId, options = {}) => {
  const { defaultResponse = [], resultsPropName = 'memoria' } = options
  const restPath = `/memorias/${memoriaId}`
  const queryCacheKey = ['memorias', memoriaId]
  return useRestQuery(queryCacheKey, restPath, {
    resultsPropName,
    defaultResponse: defaultResponse || { [resultsPropName]: [] },
    ...options,
  })
}

export const useDeleteMemoria = (options = {}) => {
  const restPath = '/memorias/:idMemoria'
  const mutationFnName = 'deleteMemoria'

  const onSuccess = {
    toastMessage: 'Memória deletada!',
    cachesToInvalidate: [['memorias']],
    cachesToRemove: [(memoria) => ['memorias', memoria?.id]],
    ...propOr({}, 'onSuccess', options), // caller options
  }

  const onError = {
    toastMessage: 'Falha ao deletar memória!',
    ...propOr({}, 'onError', options), // caller options
  }

  const deleteOptions = { onSuccess, onError }
  const res = useRestDelete(restPath, deleteOptions)

  return {
    ...res,
    [mutationFnName]: (idMemoria) => res.mutate({ pathParams: { idMemoria } }),
    [`${mutationFnName}Async`]: (idMemoria) =>
      res.mutateAsync({ pathParams: { idMemoria } }),
  }
}

export const useCreateMemoria = (options = {}) => {
  const restPath = '/memorias'
  const mutationFnName = 'createMemoria'

  const onSuccess = {
    cachesToInvalidate: ['memorias'],
    toastMessage: 'Memória criada!',
    ...propOr({}, 'onSuccess', options), // caller options
  }

  const onError = {
    toastMessage: 'Falha ao criar memória!',
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

export const useUpdateMemoria = (idMemoria, options = {}) => {
  const restPath = `/memorias/${idMemoria}`
  const mutationFnName = 'updateMemoria'

  const onSuccess = {
    cachesToInvalidate: ['memorias'],
    toastMessage: 'Memória atualizada!',
    ...propOr({}, 'onSuccess', options), // caller options
  }

  const onError = {
    toastMessage: 'Falha ao alterar memória!',
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
