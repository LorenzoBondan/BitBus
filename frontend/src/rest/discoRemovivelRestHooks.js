import { useRestQuery } from './core/restQueryHooks'
import {
  useRestDelete,
  useRestCreate,
  useRestPatch,
} from './core/restMutateHooks'
import { propOr } from 'ramda'

export const useGetDiscosRemoviveis = (options = {}) => {
  const { defaultResponse = [], resultsPropName = 'discosRemoviveis' } = options
  const restPath = '/discosRemoviveis'
  const queryCacheKey = 'discosRemoviveis'
  return useRestQuery(queryCacheKey, restPath, {
    resultsPropName,
    defaultResponse: defaultResponse || { [resultsPropName]: [] },
    ...options,
  })
}

export const useGetDiscoRemovivelById = (idDiscoRemovivel, options = {}) => {
  const { defaultResponse = [], resultsPropName = 'discoRemovivel' } = options
  const restPath = `/discosRemoviveis/${idDiscoRemovivel}`
  const queryCacheKey = ['discosRemoviveis', idDiscoRemovivel]
  return useRestQuery(queryCacheKey, restPath, {
    resultsPropName,
    defaultResponse: defaultResponse || { [resultsPropName]: [] },
    ...options,
  })
}

export const useDeleteDiscoRemovivel = (options = {}) => {
  const restPath = '/discosRemoviveis/:idDiscoRemovivel'
  const mutationFnName = 'deleteDiscoRemovivel'

  const onSuccess = {
    toastMessage: 'disco removível deletado!',
    cachesToInvalidate: [['discosRemoviveis']],
    cachesToRemove: [(dr) => ['discosRemoviveis', dr?.id]],
    ...propOr({}, 'onSuccess', options), // caller options
  }

  const onError = {
    toastMessage: 'Falha ao deletar disco removível!',
    ...propOr({}, 'onError', options), // caller options
  }

  const deleteOptions = { onSuccess, onError }
  const res = useRestDelete(restPath, deleteOptions)

  return {
    ...res,
    [mutationFnName]: (idDiscoRemovivel) =>
      res.mutate({ pathParams: { idDiscoRemovivel } }),
    [`${mutationFnName}Async`]: (idDiscoRemovivel) =>
      res.mutateAsync({ pathParams: { idDiscoRemovivel } }),
  }
}

export const useCreateDiscoRemovivel = (options = {}) => {
  const restPath = '/discosRemoviveis'
  const mutationFnName = 'createDiscoRemovivel'

  const onSuccess = {
    cachesToInvalidate: ['discosRemoviveis'],
    toastMessage: 'Disco removível criado!',
    ...propOr({}, 'onSuccess', options), // caller options
  }

  const onError = {
    toastMessage: 'Falha ao criar disco removível!',
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

export const useUpdateDiscoRemovivel = (idDiscoRemovivel, options = {}) => {
  const restPath = `/discosRemoviveis/${idDiscoRemovivel}`
  const mutationFnName = 'updateDiscoRemovivel'

  const onSuccess = {
    cachesToInvalidate: ['discosRemoviveis'],
    toastMessage: 'Disco removível atualizado!',
    ...propOr({}, 'onSuccess', options), // caller options
  }

  const onError = {
    toastMessage: 'Falha ao alterar disco removível!',
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
