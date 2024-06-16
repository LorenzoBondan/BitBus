import { useRestQuery } from './core/restQueryHooks'
import {
  useRestDelete,
  useRestCreate,
  useRestUpdate,
} from './core/restMutateHooks'
import { propOr } from 'ramda'

export const useGetDoacoes = (options = {}) => {
  const { defaultResponse = { content: [] }, resultsPropName = 'doacoes' } =
    options
  const restPath = '/doacoes'
  const queryCacheKey = 'doacoes'
  return useRestQuery(queryCacheKey, restPath, {
    resultsPropName,
    defaultResponse: defaultResponse || { [resultsPropName]: [] },
    ...options,
  })
}

export const useGetDoacaoById = (doacaoId, options = {}) => {
  const { defaultResponse = [], resultsPropName = 'doacao' } = options
  const restPath = `/doacoes/${doacaoId}`
  const queryCacheKey = ['doacoes', doacaoId]
  return useRestQuery(queryCacheKey, restPath, {
    resultsPropName,
    defaultResponse: defaultResponse || { [resultsPropName]: [] },
    ...options,
  })
}

export const useDeleteDoacao = (options = {}) => {
  const restPath = '/doacoes/:idDoacao'
  const mutationFnName = 'deleteDoacao'

  const onSuccess = {
    toastMessage: 'Doação deletada!',
    cachesToInvalidate: [['doacoes']],
    cachesToRemove: [(doacao) => ['doacoes', doacao?.id]],
    ...propOr({}, 'onSuccess', options), // caller options
  }

  const onError = {
    toastMessage: 'Falha ao deletar doação!',
    ...propOr({}, 'onError', options), // caller options
  }

  const deleteOptions = { onSuccess, onError }
  const res = useRestDelete(restPath, deleteOptions)

  return {
    ...res,
    [mutationFnName]: (idDoacao) => res.mutate({ pathParams: { idDoacao } }),
    [`${mutationFnName}Async`]: (idDoacao) =>
      res.mutateAsync({ pathParams: { idDoacao } }),
  }
}

export const useCreateDoacao = (options = {}) => {
  const restPath = '/doacoes'
  const mutationFnName = 'createDoacao'

  const onSuccess = {
    cachesToInvalidate: ['doacoes'],
    toastMessage: 'Doação criada!',
    ...propOr({}, 'onSuccess', options), // caller options
  }

  const onError = {
    toastMessage: 'Falha ao criar doação!',
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

export const useUpdateDoacao = (idDoacao, options = {}) => {
  const restPath = `/doacoes/${idDoacao}`
  const mutationFnName = 'updateDoacao'

  const onSuccess = {
    cachesToInvalidate: ['doacoes'],
    toastMessage: 'Doação atualizada!',
    ...propOr({}, 'onSuccess', options), // caller options
  }

  const onError = {
    toastMessage: 'Falha ao alterar doação!',
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
