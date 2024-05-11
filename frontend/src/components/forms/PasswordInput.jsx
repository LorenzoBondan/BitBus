import React from 'react'
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

const PasswordInput = props => {
  return <FormInput {...{ type: 'password', ...pickFormProps(props) }} />
}

PasswordInput.propTypes = propTypes
PasswordInput.defaultProps = defaultProps

export default PasswordInput
