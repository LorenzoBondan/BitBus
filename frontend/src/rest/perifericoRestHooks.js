import { useRestQuery } from './core/restQueryHooks'
import {
  useRestDelete,
  useRestCreate,
  useRestUpdate,
} from './core/restMutateHooks'
import { propOr } from 'ramda'

export const useGetPerifericos = (options = {}) => {
  const { defaultResponse = { content: [] }, resultsPropName = 'perifericos' } =
    options
  const restPath = '/perifericos'
  const queryCacheKey = 'perifericos'
  return useRestQuery(queryCacheKey, restPath, {
    resultsPropName,
    defaultResponse: defaultResponse || { [resultsPropName]: [] },
    ...options,
  })
}

export const useGetPerifericoById = (perifericoId, options = {}) => {
  const { defaultResponse = [], resultsPropName = 'periferico' } = options
  const restPath = `/perifericos/${perifericoId}`
  const queryCacheKey = ['perifericos', perifericoId]
  return useRestQuery(queryCacheKey, restPath, {
    resultsPropName,
    defaultResponse: defaultResponse || { [resultsPropName]: [] },
    ...options,
  })
}

export const useDeletePeriferico = (options = {}) => {
  const restPath = '/perifericos/:idPeriferico'
  const mutationFnName = 'deletePeriferico'

  const onSuccess = {
    toastMessage: 'Periférico deletado!',
    cachesToInvalidate: [['perifericos']],
    cachesToRemove: [(periferico) => ['perifericos', periferico?.id]],
    ...propOr({}, 'onSuccess', options), // caller options
  }

  const onError = {
    toastMessage: 'Falha ao deletar periférico!',
    ...propOr({}, 'onError', options), // caller options
  }

  const deleteOptions = { onSuccess, onError }
  const res = useRestDelete(restPath, deleteOptions)

  return {
    ...res,
    [mutationFnName]: (idPeriferico) =>
      res.mutate({ pathParams: { idPeriferico } }),
    [`${mutationFnName}Async`]: (idPeriferico) =>
      res.mutateAsync({ pathParams: { idPeriferico } }),
  }
}

export const useCreatePeriferico = (options = {}) => {
  const restPath = '/perifericos'
  const mutationFnName = 'createPeriferico'

  const onSuccess = {
    cachesToInvalidate: ['perifericos'],
    toastMessage: 'Periférico criado!',
    ...propOr({}, 'onSuccess', options), // caller options
  }

  const onError = {
    toastMessage: 'Falha ao criar periférico!',
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

export const useUpdatePeriferico = (idPeriferico, options = {}) => {
  const restPath = `/perifericos/${idPeriferico}`
  const mutationFnName = 'updatePeriferico'

  const onSuccess = {
    cachesToInvalidate: ['perifericos'],
    toastMessage: 'Periférico atualizado!',
    ...propOr({}, 'onSuccess', options), // caller options
  }

  const onError = {
    toastMessage: 'Falha ao alterar periférico!',
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
