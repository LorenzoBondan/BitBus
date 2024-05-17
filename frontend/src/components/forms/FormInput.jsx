import { forwardRef, useLayoutEffect } from 'react'
import PT from 'prop-types'

import { useFormContext } from 'react-hook-form'
import { pick, path } from 'ramda'

import FormInputLabel from './FormInputLabel'
import { nullFormContext } from './Form'
import { isNotNil, noop } from 'ramda-adjunct'

//*****************************************************************************
// Interface
//*****************************************************************************

const textAreaPropsShape = PT.shape({
  rows: PT.number,
})

const numberPropsShape = PT.shape({
  step: PT.number,
})

// Can be imported and used by parent component
export const formInputPropTypes = {
  name: PT.string.isRequired,
  value: PT.any,
  defaultValue: PT.any,
  id: PT.string,
  label: PT.string, // optional, only displayed if provided
  placeholder: PT.string,
  valueAsNumber: PT.bool,
  required: PT.bool,
  disabled: PT.bool,
  hidden: PT.bool,
  touched: PT.bool,
  dirty: PT.bool,
  onFocus: PT.func,
  validate: PT.object,

  // only if type = text area
  textAreaProps: textAreaPropsShape,

  // only if type = number
  numberProps: numberPropsShape,
}

const formInputProps = [
  'type',
  'name',
  'value',
  'label',
  'placeholder',
  'required',
  'disabled',
  'hidden',
  'onFocus',
  'validate',
]
export const pickFormProps = pick(formInputProps)

const propTypes = {
  ...formInputPropTypes,
  type: PT.oneOf([
    // add more as needed
    'text',
    'textarea',
    'email',
    'checkbox',
    'datetime-local',
    'date',
    'time',
    'file',
    'number',
    'password',
    'radio',
  ]).isRequired,
  className: PT.string,
}

const FormInput = forwardRef((props, ref) => {
  const {
    type,
    name,
    id,
    value,
    label = '',
    defaultValue,
    onFocus = noop,
  } = props
  const {
    valueAsNumber = false,
    disabled = false,
    hidden = false,
    placeholder = '',
    required = false,
  } = props
  const {
    textAreaProps = {},
    numberProps = {},
    className = '',
    validate = {},
  } = props

  const { register, setValue, formState } = useFormContext() || nullFormContext
  const { errors } = formState || {}

  useLayoutEffect(() => {
    isNotNil(value) && setValue(name, value)
  }, [name, value, setValue])

  if (hidden) return null

  const labelText = label
  const errorTextPath = [...name.split('.'), 'message']
  const errorText = path(errorTextPath, errors)

  const registerRequired = {
    value: required,
    message: `${label || placeholder} é obrigatório`,
  }

  const cn = {
    root: `transition-opacity duration-1000 mb-3 ${className}`,
    input: `focus:ring-0 focus:border-gray-600 border border-gray-600 text-gray-300 mb-1 p-2 w-full rounded text-base bg-gray-900 ${
      type !== 'textarea' && 'h-8'
    }`,
    error: 'text-red-300 font-semibold text-xs whitespace-pre-wrap',
  }

  let inputProps = {
    type,
    // Grant a way of displaying required fields when there is no label
    placeholder: placeholder + (!label ? ' *' : ''),
    className: cn.input,
    id: id || name,
    disabled,
    onFocus,
    ...register(name, { required: registerRequired, valueAsNumber, validate }),
  }

  if (type === 'textarea') inputProps.rows = textAreaProps?.rows || 3
  if (type === 'number') inputProps.step = numberProps?.step || 1

  const InputComponent = (
    <div className={cn.root}>
      <FormInputLabel {...{ labelText, required }} />
      <div className="">
        {(() => {
          switch (type) {
            case 'textarea':
              return <textarea ref={ref} className={cn.input} {...inputProps} />
            default:
              return (
                <input
                  ref={ref}
                  className={cn.input}
                  defaultValue={defaultValue}
                  {...inputProps}
                />
              )
          }
        })()}
        {errorText && <div className={cn.error}>{errorText}</div>}
      </div>
    </div>
  )

  return InputComponent
})

FormInput.propTypes = propTypes

export default FormInput
