import { useRestQuery } from './core/restQueryHooks'
import {
  useRestDelete,
  useRestCreate,
  useRestUpdate,
} from './core/restMutateHooks'
import { propOr } from 'ramda'

export const useGetPessoas = (options = {}) => {
  const { defaultResponse = { content: [] }, resultsPropName = 'pessoas' } =
    options
  const restPath = '/pessoas'
  const queryCacheKey = 'pessoas'
  return useRestQuery(queryCacheKey, restPath, {
    resultsPropName,
    defaultResponse: defaultResponse || { [resultsPropName]: [] },
    ...options,
  })
}

export const useGetPessoaById = (pessoaId, options = {}) => {
  const { defaultResponse = [], resultsPropName = 'pessoa' } = options
  const restPath = `/pessoas/${pessoaId}`
  const queryCacheKey = ['pessoas', pessoaId]
  return useRestQuery(queryCacheKey, restPath, {
    resultsPropName,
    defaultResponse: defaultResponse || { [resultsPropName]: [] },
    ...options,
  })
}

export const useDeletePessoa = (options = {}) => {
  const restPath = '/pessoas/:idPessoa'
  const mutationFnName = 'deletePessoa'

  const onSuccess = {
    toastMessage: 'Pessoa deletada!',
    cachesToInvalidate: [['pessoas']],
    cachesToRemove: [(pessoa) => ['pessoas', pessoa?.id]],
    ...propOr({}, 'onSuccess', options), // caller options
  }

  const onError = {
    toastMessage: 'Falha ao deletar pessoa!',
    ...propOr({}, 'onError', options), // caller options
  }

  const deleteOptions = { onSuccess, onError }
  const res = useRestDelete(restPath, deleteOptions)

  return {
    ...res,
    [mutationFnName]: (idPessoa) => res.mutate({ pathParams: { idPessoa } }),
    [`${mutationFnName}Async`]: (idPessoa) =>
      res.mutateAsync({ pathParams: { idPessoa } }),
  }
}

export const useCreatePessoa = (options = {}) => {
  const restPath = '/pessoas'
  const mutationFnName = 'createPessoa'

  const onSuccess = {
    cachesToInvalidate: ['pessoas'],
    toastMessage: 'Pessoa criada!',
    ...propOr({}, 'onSuccess', options), // caller options
  }

  const onError = {
    toastMessage: 'Falha ao criar pessoa!',
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

export const useUpdatePessoa = (idPessoa, options = {}) => {
  const restPath = `/pessoas/${idPessoa}`
  const mutationFnName = 'updatePessoa'

  const onSuccess = {
    cachesToInvalidate: ['pessoas'],
    toastMessage: 'Pessoa atualizada!',
    ...propOr({}, 'onSuccess', options), // caller options
  }

  const onError = {
    toastMessage: 'Falha ao alterar pessoa!',
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
