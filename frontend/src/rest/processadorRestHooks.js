import { useRestQuery } from './core/restQueryHooks'
import {
  useRestDelete,
  useRestCreate,
  useRestUpdate,
} from './core/restMutateHooks'
import { propOr } from 'ramda'

export const useGetProcessadores = (options = {}) => {
  const {
    defaultResponse = { content: [] },
    resultsPropName = 'processadores',
  } = options
  const restPath = '/processadores'
  const queryCacheKey = 'processadores'
  return useRestQuery(queryCacheKey, restPath, {
    resultsPropName,
    defaultResponse: defaultResponse || { [resultsPropName]: [] },
    ...options,
  })
}

export const useGetProcessadorById = (processadorId, options = {}) => {
  const { defaultResponse = [], resultsPropName = 'processador' } = options
  const restPath = `/processadores/${processadorId}`
  const queryCacheKey = ['processadores', processadorId]
  return useRestQuery(queryCacheKey, restPath, {
    resultsPropName,
    defaultResponse: defaultResponse || { [resultsPropName]: [] },
    ...options,
  })
}

export const useDeleteProcessador = (options = {}) => {
  const restPath = '/processadores/:idProcessador'
  const mutationFnName = 'deleteProcessador'

  const onSuccess = {
    toastMessage: 'Processador deletado!',
    cachesToInvalidate: [['processadores']],
    cachesToRemove: [(processador) => ['processadores', processador?.id]],
    ...propOr({}, 'onSuccess', options), // caller options
  }

  const onError = {
    toastMessage: 'Falha ao deletar processador!',
    ...propOr({}, 'onError', options), // caller options
  }

  const deleteOptions = { onSuccess, onError }
  const res = useRestDelete(restPath, deleteOptions)

  return {
    ...res,
    [mutationFnName]: (idProcessador) =>
      res.mutate({ pathParams: { idProcessador } }),
    [`${mutationFnName}Async`]: (idProcessador) =>
      res.mutateAsync({ pathParams: { idProcessador } }),
  }
}

export const useCreateProcessador = (options = {}) => {
  const restPath = '/processadores'
  const mutationFnName = 'createProcessador'

  const onSuccess = {
    cachesToInvalidate: ['processadores'],
    toastMessage: 'Processador criado!',
    ...propOr({}, 'onSuccess', options), // caller options
  }

  const onError = {
    toastMessage: 'Falha ao criar processador!',
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

export const useUpdateProcessador = (idProcessador, options = {}) => {
  const restPath = `/processadores/${idProcessador}`
  const mutationFnName = 'updateProcessador'

  const onSuccess = {
    cachesToInvalidate: ['processadores'],
    toastMessage: 'Processador atualizado!',
    ...propOr({}, 'onSuccess', options), // caller options
  }

  const onError = {
    toastMessage: 'Falha ao alterar processador!',
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
