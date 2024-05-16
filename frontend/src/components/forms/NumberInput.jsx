import PT from 'prop-types'
import FormInput, { formInputPropTypes, pickFormProps } from './FormInput'

const propTypes = {
  ...formInputPropTypes,
  step: PT.number,
}

const NumberInput = (props) => {
  const { step = 1 } = props
  const numberInputProps = {
    type: 'number',
    valueAsNumber: true,
    numberProps: { step },
    ...pickFormProps(props),
  }
  return <FormInput {...numberInputProps} />
}

NumberInput.propTypes = propTypes
export default NumberInput
