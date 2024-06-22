import {
  complement,
  isNil,
  find,
  propEq,
  curry,
  flatten,
  append,
  assoc,
} from 'ramda'

import {
  isNumber,
  isString,
  isObject,
  isBoolean,
  isArray,
  isFunction,
} from 'ramda-adjunct'

export const throwIf = (condition, errorMsg) => {
  if (condition) {
    console.error(`ERROR: ${errorMsg}`)
    throw new Error(`ERROR: ${errorMsg}`)
  }
}

export const isStringOrNumber = (toCheck) =>
  isString(toCheck) || isNumber(toCheck)

export const isNotStringOrNumber = complement(isStringOrNumber)

export const isStringOrNumberOrBool = (toCheck) =>
  isString(toCheck) || isNumber(toCheck) || isBoolean(toCheck)

export const isNotStringOrNumberOrBool = complement(isStringOrNumberOrBool)

export const isNilOrObject = (toCheck) => isNil(toCheck) || isObject(toCheck)
export const isNotNilOrObject = complement(isNilOrObject)

export const isNilOrStringOrObject = (toCheck) =>
  isNil(toCheck) || isString(toCheck) || isObject(toCheck)

export const isNotNilOrStringOrObject = complement(isNilOrStringOrObject)

export const randomNumberBetween = (min, max) => {
  min = Math.floor(min)
  max = Math.ceil(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const findByProp = curry((propName, proValToMatch, objectList) =>
  find(propEq(propName, proValToMatch), objectList)
)

export const findById = (id, objectList) => findByProp('id', id, objectList)

export const boolToYesNo = (bool) => (bool ? 'Yes' : 'No')

export const arrayify = (input) => (isArray(input) ? input : [input])
export const flatArrayify = (input) => flatten(arrayify(input))

export const isNilOrArray = (toCheck) => isNil(toCheck) || isArray(toCheck)
export const isNotNilOrArray = complement(isNilOrArray)

export const isStringOrArrayOrFunction = (toCheck) =>
  isString(toCheck) || isArray(toCheck) || isFunction(toCheck)

export const isNotStringOrArrayOrFunction = complement(
  isStringOrArrayOrFunction
)

export const isStringOrFunction = (toCheck) =>
  isString(toCheck) || isFunction(toCheck)

export const isNotStringOrFunction = complement(isStringOrFunction)

export const asycnSleep = (sleepMilliSec) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, sleepMilliSec)
  })

export const toJson = (input) => JSON.stringify(input, null, 2)

export const appendIf = curry((condition, toAppend, list) =>
  condition ? append(toAppend, list) : list
)

export const assocIf = curry((condition, propName, propVal, toObj) =>
  condition ? assoc(propName, propVal, toObj) : toObj
)

export const copyTextToClipboard = async (text) => {
  if ('clipboard' in navigator) {
    return await navigator.clipboard.writeText(text)
  } else {
    // Grants support to IE
    return document.execCommand('copy', true, text)
  }
}

export const dateTimeFormatter = (d) => {
  const date = new Date(d)
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  const hour = date.getHours().toString().padStart(2, '0')
  const minute = date.getMinutes().toString().padStart(2, '0')
  return `${day}/${month}/${date.getFullYear()} - ${hour}:${minute}`
}

export const timeFormatter = (d) => {
  const min = d % 60
  const h = Math.floor(d / 60)
  return `${h}:${min.toString().padStart(2, '0')}`
}

export function debounce(func, timeout = 500) {
  let timer
  return () => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func()
    }, timeout)
  }
}
