import FormInput, { formInputPropTypes, pickFormProps } from './FormInput'

const propTypes = formInputPropTypes

const RadioButton = (props) => {
  return (
    <FormInput
      {...{
        type: 'radio',
        id: props.id,
        onChange: props.changed,
        ...pickFormProps(props),
      }}
    />
  )
}

RadioButton.propTypes = propTypes

export default RadioButton
