import FormInput, { formInputPropTypes, pickFormProps } from './FormInput'

const propTypes = formInputPropTypes
//*****************************************************************************
// Components
//*****************************************************************************

const CheckboxInput = (props) => {
  return (
    <FormInput
      {...{
        type: 'checkbox',
        ...pickFormProps(props),
      }}
    />
  )
}

CheckboxInput.propTypes = propTypes

export default CheckboxInput
