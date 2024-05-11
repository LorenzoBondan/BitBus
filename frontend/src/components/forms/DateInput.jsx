import FormInput, { formInputPropTypes, pickFormProps } from './FormInput'

const propTypes = formInputPropTypes

const DateInput = (props) => {
  return (
    <FormInput
      {...{
        type: 'date',
        defaultValue: props.defaultValue,
        ...pickFormProps(props),
        className: 'text-red',
      }}
    />
  )
}

DateInput.propTypes = propTypes

export default DateInput
