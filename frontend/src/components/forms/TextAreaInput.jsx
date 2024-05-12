import PT from 'prop-types'
import FormInput, { formInputPropTypes, pickFormProps } from './FormInput'

const propTypes = {
  ...formInputPropTypes,
  rows: PT.number,
}

const TextAreaInput = (props) => {
  const { rows = 3 } = props
  const textAreaInputProps = {
    type: 'textarea',
    textAreaProps: { rows },
    ...pickFormProps(props),
  }
  return <FormInput {...textAreaInputProps} />
}

TextAreaInput.propTypes = propTypes
export default TextAreaInput
