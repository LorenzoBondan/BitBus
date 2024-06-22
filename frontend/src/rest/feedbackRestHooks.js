import { useRestQuery } from './core/restQueryHooks'
import {
  useRestDelete,
  useRestCreate,
  useRestUpdate,
} from './core/restMutateHooks'
import { propOr } from 'ramda'

export const useGetFeedbacks = (options = {}) => {
  const { defaultResponse = { content: [] }, resultsPropName = 'feedbacks' } =
    options
  const restPath = '/feedbacks'
  const queryCacheKey = 'feedbacks'
  return useRestQuery(queryCacheKey, restPath, {
    resultsPropName,
    defaultResponse: defaultResponse || { [resultsPropName]: [] },
    ...options,
  })
}

export const useGetFeedbackById = (feedbackId, options = {}) => {
  const { defaultResponse = [], resultsPropName = 'feedback' } = options
  const restPath = `/feedbacks/${feedbackId}`
  const queryCacheKey = ['feedbacks', feedbackId]
  return useRestQuery(queryCacheKey, restPath, {
    resultsPropName,
    defaultResponse: defaultResponse || { [resultsPropName]: [] },
    ...options,
  })
}

export const useDeleteFeedback = (visitaId, options = {}) => {
  const restPath = '/feedbacks/:idFeedback'
  const mutationFnName = 'deleteFeedback'

  const onSuccess = {
    toastMessage: 'Feedback deletado!',
    cachesToInvalidate: [['feedbacks'], ['visitas', visitaId]],
    cachesToRemove: [(feedback) => ['feedbacks', feedback?.id]],
    ...propOr({}, 'onSuccess', options), // caller options
  }

  const onError = {
    toastMessage: 'Falha ao deletar feedback!',
    ...propOr({}, 'onError', options), // caller options
  }

  const deleteOptions = { onSuccess, onError }
  const res = useRestDelete(restPath, deleteOptions)

  return {
    ...res,
    [mutationFnName]: (idFeedback) =>
      res.mutate({ pathParams: { idFeedback } }),
    [`${mutationFnName}Async`]: (idFeedback) =>
      res.mutateAsync({ pathParams: { idFeedback } }),
  }
}

export const useCreateFeedback = (options = {}) => {
  const restPath = '/feedbacks'
  const mutationFnName = 'createFeedback'

  const onSuccess = {
    cachesToInvalidate: ['feedbacks'],
    toastMessage: 'Feedback criado!',
    ...propOr({}, 'onSuccess', options), // caller options
  }

  const onError = {
    toastMessage: 'Falha ao criar feedback!',
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

export const useUpdateFeedback = (idFeedback, options = {}) => {
  const restPath = `/feedbacks/${idFeedback}`
  const mutationFnName = 'updateFeedback'

  const onSuccess = {
    cachesToInvalidate: ['feedbacks'],
    toastMessage: 'Feedback atualizado!',
    ...propOr({}, 'onSuccess', options), // caller options
  }

  const onError = {
    toastMessage: 'Falha ao alterar feedback!',
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
