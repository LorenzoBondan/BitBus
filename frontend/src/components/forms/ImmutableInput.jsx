import React, { useLayoutEffect } from 'react'
import PT from 'prop-types'

import { useFormContext } from 'react-hook-form'
import { path } from 'ramda'

import FormInputLabel from './FormInputLabel'
import { nullFormContext } from './Form'
import { isNotNil } from 'ramda-adjunct'

//*****************************************************************************
// Interface
//*****************************************************************************

const propTypes = {
  name: PT.string.isRequired,
  value: PT.any,
  label: PT.string, // optional, only displayed if provided
  required: PT.bool,
  hidden: PT.bool,
  className: PT.string,
}

const defaultProps = {
  label: '',
  placeholder: '',
  valueAsNumber: false,
  required: false,
  hidden: false,
  className: '',
}

//*****************************************************************************
// Components
//*****************************************************************************

const ImmutableInput = props => {
  const { name, value, label } = props
  const { hidden, required } = props
  const { className } = props

  const { setValue, formState } = useFormContext() || nullFormContext
  const { errors } = formState || {}

  useLayoutEffect(() => {
    isNotNil(value) && setValue(name, value)
  }, [name, value, setValue])

  if (hidden) return null

  const labelText = label
  const errorTextPath = [...name.split('.'), 'message']
  const errorText = path(errorTextPath, errors)

  const cn = {
    root: `transition-opacity duration-1000 ${className}`,
    input: 'text-gray-300 mb-3 p-2 h-8 w-full rounded text-base',
    error: 'text-red-300 font-semibold',
  }

  const TextComponent = (
    <div className={cn.root}>
      <FormInputLabel {...{ labelText, required }} />
      <div className=''>
        <div className={cn.input}>
          {value}
        </div>
        {errorText && <div className={cn.error}>{errorText}</div>}
      </div>
    </div>
  )

  return TextComponent
}

ImmutableInput.propTypes = propTypes
ImmutableInput.defaultProps = defaultProps

export default ImmutableInput
