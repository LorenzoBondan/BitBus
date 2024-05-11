import React from 'react'
import FormInput, { formInputPropTypes, formInputDefaultProps, pickFormProps } from './FormInput'

//*****************************************************************************
// Interface
//*****************************************************************************

const propTypes = formInputPropTypes
const defaultProps = formInputDefaultProps

//*****************************************************************************
// Components
//*****************************************************************************

const valueAsNumber = true
const NumberInput = props => {
  return (
    <FormInput {...{ valueAsNumber, type: 'number', ...pickFormProps(props) }} />
  )
}

NumberInput.propTypes = propTypes
NumberInput.defaultProps = defaultProps
export default NumberInput
