import { useRestQuery } from './core/restQueryHooks'
import {
  useRestDelete,
  useRestCreate,
  useRestPatch,
} from './core/restMutateHooks'
import { propOr } from 'ramda'

export const useGetPlacas = (options = {}) => {
  const { defaultResponse = { content: [] }, resultsPropName = 'placas' } =
    options
  const restPath = '/placas'
  const queryCacheKey = 'placas'
  return useRestQuery(queryCacheKey, restPath, {
    resultsPropName,
    defaultResponse: defaultResponse || { [resultsPropName]: [] },
    ...options,
  })
}

export const useGetPlacaById = (placaId, options = {}) => {
  const { defaultResponse = [], resultsPropName = 'placa' } = options
  const restPath = `/placas/${placaId}`
  const queryCacheKey = ['placas', placaId]
  return useRestQuery(queryCacheKey, restPath, {
    resultsPropName,
    defaultResponse: defaultResponse || { [resultsPropName]: [] },
    ...options,
  })
}

export const useDeletePlaca = (options = {}) => {
  const restPath = '/placas/:idPlaca'
  const mutationFnName = 'deletePlaca'

  const onSuccess = {
    toastMessage: 'Placa deletada!',
    cachesToInvalidate: [['placas']],
    cachesToRemove: [(placa) => ['placas', placa?.id]],
    ...propOr({}, 'onSuccess', options), // caller options
  }

  const onError = {
    toastMessage: 'Falha ao deletar placa!',
    ...propOr({}, 'onError', options), // caller options
  }

  const deleteOptions = { onSuccess, onError }
  const res = useRestDelete(restPath, deleteOptions)

  return {
    ...res,
    [mutationFnName]: (applicationDeveloperId) =>
      res.mutate({ pathParams: { applicationDeveloperId } }),
    [`${mutationFnName}Async`]: (applicationDeveloperId) =>
      res.mutateAsync({ pathParams: { applicationDeveloperId } }),
  }
}

export const useCreatePlaca = (options = {}) => {
  const restPath = '/placas'
  const mutationFnName = 'createPlaca'

  const onSuccess = {
    cachesToInvalidate: ['placas'],
    toastMessage: 'Placa criada!',
    ...propOr({}, 'onSuccess', options), // caller options
  }

  const onError = {
    toastMessage: 'Falha ao criar placa!',
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

export const useUpdatePlaca = (applicationDeveloperId, options = {}) => {
  const restPath = `/placas/${applicationDeveloperId}`
  const mutationFnName = 'updatePlaca'

  const onSuccess = {
    cachesToInvalidate: ['placas'],
    // TODO: add invalidation of operator, operatorId Cache ?
    toastMessage: 'Placa atualizada!',
    ...propOr({}, 'onSuccess', options), // caller options
  }

  const onError = {
    toastMessage: 'Falha ao alterar placa!',
    ...propOr({}, 'onError', options), // caller options
  }

  const updateOptions = { mutationFnName, onSuccess, onError }
  const res = useRestPatch(restPath, updateOptions)
  return {
    ...res,
    [mutationFnName]: (data, params) => res.mutate({ data, params }),
    [`${mutationFnName}Async`]: (data, params) =>
      res.mutateAsync({ data, params }),
  }
}
