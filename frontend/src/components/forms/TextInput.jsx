import React, { forwardRef } from 'react'
import FormInput, {
  formInputPropTypes,
  formInputDefaultProps,
  pickFormProps,
} from './FormInput'

//*****************************************************************************
// Interface
//*****************************************************************************

const propTypes = formInputPropTypes
const defaultProps = formInputDefaultProps

//*****************************************************************************
// Components
//*****************************************************************************

const TextInput = forwardRef((props, ref) => {
  return <FormInput ref={ref} {...{ type: 'text', ...pickFormProps(props) }} />
})

TextInput.propTypes = propTypes
TextInput.defaultProps = defaultProps

export default TextInput
