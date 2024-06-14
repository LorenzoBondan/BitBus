import { useRestQuery } from './core/restQueryHooks'
import {
  useRestDelete,
  useRestCreate,
  useRestUpdate,
} from './core/restMutateHooks'
import { propOr } from 'ramda'

export const useGetOficinas = (options = {}) => {
  const { defaultResponse = { content: [] }, resultsPropName = 'oficinas' } =
    options
  const restPath = '/oficinas'
  const queryCacheKey = 'oficinas'
  return useRestQuery(queryCacheKey, restPath, {
    resultsPropName,
    defaultResponse: defaultResponse || { [resultsPropName]: [] },
    ...options,
  })
}

export const useGetOficinaById = (oficinaId, options = {}) => {
  const { defaultResponse = [], resultsPropName = 'oficina' } = options
  const restPath = `/oficinas/${oficinaId}`
  const queryCacheKey = ['oficinas', oficinaId]
  return useRestQuery(queryCacheKey, restPath, {
    resultsPropName,
    defaultResponse: defaultResponse || { [resultsPropName]: [] },
    ...options,
  })
}

export const useDeleteOficina = (options = {}) => {
  const restPath = '/oficinas/:idOficina'
  const mutationFnName = 'deleteOficina'

  const onSuccess = {
    toastMessage: 'Oficina deletada!',
    cachesToInvalidate: [['oficinas']],
    cachesToRemove: [(oficina) => ['oficinas', oficina?.id]],
    ...propOr({}, 'onSuccess', options), // caller options
  }

  const onError = {
    toastMessage: 'Falha ao deletar oficina!',
    ...propOr({}, 'onError', options), // caller options
  }

  const deleteOptions = { onSuccess, onError }
  const res = useRestDelete(restPath, deleteOptions)

  return {
    ...res,
    [mutationFnName]: (idOficina) => res.mutate({ pathParams: { idOficina } }),
    [`${mutationFnName}Async`]: (idOficina) =>
      res.mutateAsync({ pathParams: { idOficina } }),
  }
}

export const useCreateOficina = (options = {}) => {
  const restPath = '/oficinas'
  const mutationFnName = 'createOficina'

  const onSuccess = {
    cachesToInvalidate: ['oficinas'],
    toastMessage: 'Oficina criada!',
    ...propOr({}, 'onSuccess', options), // caller options
  }

  const onError = {
    toastMessage: 'Falha ao criar oficina!',
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

export const useUpdateOficina = (idOficina, options = {}) => {
  const restPath = `/oficinas/${idOficina}`
  const mutationFnName = 'updateOficina'

  const onSuccess = {
    cachesToInvalidate: ['oficinas'],
    toastMessage: 'Oficina atualizada!',
    ...propOr({}, 'onSuccess', options), // caller options
  }

  const onError = {
    toastMessage: 'Falha ao alterar oficina!',
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
