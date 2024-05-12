import FormInput, { formInputPropTypes, pickFormProps } from './FormInput'

const propTypes = formInputPropTypes

const PasswordInput = (props) => {
  return <FormInput {...{ type: 'password', ...pickFormProps(props) }} />
}

PasswordInput.propTypes = propTypes

export default PasswordInput
