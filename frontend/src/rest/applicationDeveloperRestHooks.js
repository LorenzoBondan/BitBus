import { useRestQuery } from './core/restQueryHooks'
import {
  useRestDelete,
  useRestCreate,
  useRestPatch,
} from './core/restMutateHooks'
import { propOr } from 'ramda'

export const useGetApplicationDevelopers = (options = {}) => {
  const { defaultResponse = [], resultsPropName = 'applicationDevelopers' } =
    options
  const restPath = '/application-developers'
  const queryCacheKey = 'application-developers'
  return useRestQuery(queryCacheKey, restPath, {
    resultsPropName,
    defaultResponse: defaultResponse || { [resultsPropName]: [] },
    ...options,
  })
}

export const useGetApplicationDeveloperById = (
  applicationDeveloperId,
  options = {}
) => {
  const { defaultResponse = [], resultsPropName = 'applicationDeveloper' } =
    options
  const restPath = `/application-developers/${applicationDeveloperId}`
  const queryCacheKey = ['application-developers', applicationDeveloperId]
  return useRestQuery(queryCacheKey, restPath, {
    resultsPropName,
    defaultResponse: defaultResponse || { [resultsPropName]: [] },
    ...options,
  })
}

// returns delete function that accepts the application dev id for delete
export const useDeleteApplicationDeveloper = (options = {}) => {
  const restPath = '/application-developers/:applicationDeveloperId'
  const mutationFnName = 'deleteApplicationDeveloper'

  const onSuccess = {
    toastMessage: 'Application Developer Deleted!',
    cachesToInvalidate: [['application-developers']],
    cachesToRemove: [
      (deletedApplicationDeveloper) => [
        'application-developers',
        deletedApplicationDeveloper?.id,
      ],
    ],
    ...propOr({}, 'onSuccess', options), // caller options
  }

  const onError = {
    toastMessage: 'Application Developer Delete Failed!',
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

export const useCreateApplicationDeveloper = (options = {}) => {
  const restPath = '/application-developers'
  const mutationFnName = 'createApplicationDeveloper'

  const onSuccess = {
    cachesToInvalidate: ['application-developers'],
    toastMessage: 'Application Developer Created!',
    ...propOr({}, 'onSuccess', options), // caller options
  }

  const onError = {
    toastMessage: 'Application Developer Create Failed!',
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

export const useUpdateApplicationDeveloper = (
  applicationDeveloperId,
  options = {}
) => {
  const restPath = `/application-developers/${applicationDeveloperId}`
  const mutationFnName = 'updateApplicationDeveloper'

  const onSuccess = {
    cachesToInvalidate: ['application-developers'],
    // TODO: add invalidation of operator, operatorId Cache ?
    toastMessage: 'Application Developer Update Successful!',
    ...propOr({}, 'onSuccess', options), // caller options
  }

  const onError = {
    toastMessage: 'Application Developer Update Failed!',
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

export const useSuspendApplicationDeveloper = (
  applicationDeveloperId,
  options = {}
) => {
  const restPath = `/app-dev-suspension/${applicationDeveloperId}`
  const mutationFnName = 'suspendApplicationDeveloper'

  const onSuccess = {
    cachesToInvalidate: ['application-developers'],
    // TODO: add invalidation of operator, operatorId Cache ?
    toastMessage: 'Application Developer Update Successful!',
    ...propOr({}, 'onSuccess', options), // caller options
  }

  const onError = {
    toastMessage: 'Application Developer Update Failed!',
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

export const useReactivateApplicationDeveloper = (
  applicationDeveloperId,
  options = {}
) => {
  const restPath = `/app-dev-reactivation/${applicationDeveloperId}`
  const mutationFnName = 'reactivateApplicationDeveloper'

  const onSuccess = {
    cachesToInvalidate: ['application-developers'],
    // TODO: add invalidation of operator, operatorId Cache ?
    toastMessage: 'Application Developer Update Successful!',
    ...propOr({}, 'onSuccess', options), // caller options
  }

  const onError = {
    toastMessage: 'Application Developer Update Failed!',
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
