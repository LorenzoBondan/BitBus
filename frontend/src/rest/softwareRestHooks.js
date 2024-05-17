import { useRestQuery } from './core/restQueryHooks'
import {
  useRestDelete,
  useRestCreate,
  useRestUpdate,
} from './core/restMutateHooks'
import { propOr } from 'ramda'

export const useGetSoftwares = (options = {}) => {
  const { defaultResponse = { content: [] }, resultsPropName = 'softwares' } =
    options
  const restPath = '/softwares'
  const queryCacheKey = 'softwares'
  return useRestQuery(queryCacheKey, restPath, {
    resultsPropName,
    defaultResponse: defaultResponse || { [resultsPropName]: [] },
    ...options,
  })
}

export const useGetSoftwareById = (softwareId, options = {}) => {
  const { defaultResponse = [], resultsPropName = 'software' } = options
  const restPath = `/softwares/${softwareId}`
  const queryCacheKey = ['softwares', softwareId]
  return useRestQuery(queryCacheKey, restPath, {
    resultsPropName,
    defaultResponse: defaultResponse || { [resultsPropName]: [] },
    ...options,
  })
}

export const useDeleteSoftware = (options = {}) => {
  const restPath = '/softwares/:idSoftware'
  const mutationFnName = 'deleteSoftware'

  const onSuccess = {
    toastMessage: 'Software deletado!',
    cachesToInvalidate: [['softwares']],
    cachesToRemove: [(software) => ['softwares', software?.id]],
    ...propOr({}, 'onSuccess', options), // caller options
  }

  const onError = {
    toastMessage: 'Falha ao deletar software!',
    ...propOr({}, 'onError', options), // caller options
  }

  const deleteOptions = { onSuccess, onError }
  const res = useRestDelete(restPath, deleteOptions)

  return {
    ...res,
    [mutationFnName]: (idSoftware) =>
      res.mutate({ pathParams: { idSoftware } }),
    [`${mutationFnName}Async`]: (idSoftware) =>
      res.mutateAsync({ pathParams: { idSoftware } }),
  }
}

export const useCreateSoftware = (options = {}) => {
  const restPath = '/softwares'
  const mutationFnName = 'createSoftware'

  const onSuccess = {
    cachesToInvalidate: ['softwares'],
    toastMessage: 'Software criado!',
    ...propOr({}, 'onSuccess', options), // caller options
  }

  const onError = {
    toastMessage: 'Falha ao criar software!',
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

export const useUpdateSoftware = (idSoftware, options = {}) => {
  const restPath = `/softwares/${idSoftware}`
  const mutationFnName = 'updateSoftware'

  const onSuccess = {
    cachesToInvalidate: ['softwares'],
    toastMessage: 'Software atualizado!',
    ...propOr({}, 'onSuccess', options), // caller options
  }

  const onError = {
    toastMessage: 'Falha ao alterar software!',
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
