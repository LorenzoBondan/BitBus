import { useRestQuery } from './core/restQueryHooks'
import {
  useRestDelete,
  useRestCreate,
  useRestUpdate,
} from './core/restMutateHooks'
import { propOr } from 'ramda'

export const useGetPapeis = (options = {}) => {
  const { defaultResponse = { content: [] }, resultsPropName = 'papeis' } =
    options
  const restPath = '/papeis'
  const queryCacheKey = 'papeis'
  return useRestQuery(queryCacheKey, restPath, {
    resultsPropName,
    defaultResponse: defaultResponse || { [resultsPropName]: [] },
    ...options,
  })
}

export const useGetPapelById = (papelId, options = {}) => {
  const { defaultResponse = [], resultsPropName = 'papel' } = options
  const restPath = `/papeis/${papelId}`
  const queryCacheKey = ['papeis', papelId]
  return useRestQuery(queryCacheKey, restPath, {
    resultsPropName,
    defaultResponse: defaultResponse || { [resultsPropName]: [] },
    ...options,
  })
}

export const useDeletePapel = (options = {}) => {
  const restPath = '/papeis/:papelId'
  const mutationFnName = 'deletePapel'

  const onSuccess = {
    toastMessage: 'Papel deletado!',
    cachesToInvalidate: [['papeis']],
    cachesToRemove: [(papel) => ['papeis', papel?.id]],
    ...propOr({}, 'onSuccess', options), // caller options
  }

  const onError = {
    toastMessage: 'Falha ao deletar papel!',
    ...propOr({}, 'onError', options), // caller options
  }

  const deleteOptions = { onSuccess, onError }
  const res = useRestDelete(restPath, deleteOptions)

  return {
    ...res,
    [mutationFnName]: (papelId) => res.mutate({ pathParams: { papelId } }),
    [`${mutationFnName}Async`]: (papelId) =>
      res.mutateAsync({ pathParams: { papelId } }),
  }
}

export const useCreatePapel = (options = {}) => {
  const restPath = '/papeis'
  const mutationFnName = 'createPapel'

  const onSuccess = {
    cachesToInvalidate: ['papeis'],
    toastMessage: 'Papel criado!',
    ...propOr({}, 'onSuccess', options), // caller options
  }

  const onError = {
    toastMessage: 'Falha ao criar papel!',
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

export const useUpdatePapel = (papelId, options = {}) => {
  const restPath = `/papeis/${papelId}`
  const mutationFnName = 'updatePapel'

  const onSuccess = {
    cachesToInvalidate: ['papeis'],
    toastMessage: 'Papel atualizado!',
    ...propOr({}, 'onSuccess', options), // caller options
  }

  const onError = {
    toastMessage: 'Falha ao alterar papel!',
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
