import FormInput, { formInputPropTypes, pickFormProps } from './FormInput'

const propTypes = formInputPropTypes

const valueAsNumber = true
const NumberInput = (props) => {
  return (
    <FormInput
      {...{ valueAsNumber, type: 'number', ...pickFormProps(props) }}
    />
  )
}

NumberInput.propTypes = propTypes
export default NumberInput
