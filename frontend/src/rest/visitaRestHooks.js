import { useRestQuery } from './core/restQueryHooks'
import {
  useRestDelete,
  useRestCreate,
  useRestUpdate,
} from './core/restMutateHooks'
import { propOr } from 'ramda'

export const useGetVisitas = (options = {}) => {
  const { defaultResponse = { content: [] }, resultsPropName = 'visitas' } =
    options
  const restPath = '/visitas'
  const queryCacheKey = 'visitas'
  return useRestQuery(queryCacheKey, restPath, {
    resultsPropName,
    defaultResponse: defaultResponse || { [resultsPropName]: [] },
    ...options,
  })
}

export const useGetVisitaById = (visitaId, options = {}) => {
  const { defaultResponse = {}, resultsPropName = 'visita' } = options
  const restPath = `/visitas/${visitaId}`
  const queryCacheKey = ['visitas', visitaId]
  return useRestQuery(queryCacheKey, restPath, {
    resultsPropName,
    defaultResponse: defaultResponse || { [resultsPropName]: [] },
    ...options,
  })
}

export const useDeleteVisita = (options = {}) => {
  const restPath = '/visitas/:idVisita'
  const mutationFnName = 'deleteVisita'

  const onSuccess = {
    toastMessage: 'Visita deletada!',
    cachesToInvalidate: [['visitas']],
    cachesToRemove: [(visita) => ['visitas', visita?.id]],
    ...propOr({}, 'onSuccess', options), // caller options
  }

  const onError = {
    toastMessage: 'Falha ao deletar visita!',
    ...propOr({}, 'onError', options), // caller options
  }

  const deleteOptions = { onSuccess, onError }
  const res = useRestDelete(restPath, deleteOptions)

  return {
    ...res,
    [mutationFnName]: (idVisita) => res.mutate({ pathParams: { idVisita } }),
    [`${mutationFnName}Async`]: (idVisita) =>
      res.mutateAsync({ pathParams: { idVisita } }),
  }
}

export const useCreateVisita = (options = {}) => {
  const restPath = '/visitas'
  const mutationFnName = 'createVisita'

  const onSuccess = {
    cachesToInvalidate: ['visitas'],
    toastMessage: 'Visita criada!',
    ...propOr({}, 'onSuccess', options), // caller options
  }

  const onError = {
    toastMessage: 'Falha ao criar visita!',
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

export const useUpdateVisita = (idVisita, options = {}) => {
  const restPath = `/visitas/${idVisita}`
  const mutationFnName = 'updateVisita'

  const onSuccess = {
    cachesToInvalidate: ['visitas'],
    toastMessage: 'Visita atualizada!',
    ...propOr({}, 'onSuccess', options), // caller options
  }

  const onError = {
    toastMessage: 'Falha ao alterar visita!',
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
