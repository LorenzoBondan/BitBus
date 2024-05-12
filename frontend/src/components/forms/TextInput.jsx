import { forwardRef } from 'react'
import FormInput, { formInputPropTypes, pickFormProps } from './FormInput'

const propTypes = formInputPropTypes

const TextInput = forwardRef((props, ref) => {
  return <FormInput ref={ref} {...{ type: 'text', ...pickFormProps(props) }} />
})

TextInput.propTypes = propTypes

export default TextInput
