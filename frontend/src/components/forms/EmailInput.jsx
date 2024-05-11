import FormInput, { formInputPropTypes, pickFormProps } from './FormInput'

const propTypes = formInputPropTypes

const EmailInput = (props) => {
  return <FormInput {...{ type: 'email', ...pickFormProps(props) }} />
}

EmailInput.propTypes = propTypes
export default EmailInput
