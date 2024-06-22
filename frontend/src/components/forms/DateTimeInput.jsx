import FormInput, { formInputPropTypes, pickFormProps } from './FormInput'

const propTypes = formInputPropTypes

const DateTimeInput = (props) => {
  return (
    <FormInput
      {...{
        type: 'datetime-local',
        defaultValue: props.defaultValue,
        ...pickFormProps(props),
        className: 'text-red',
      }}
    />
  )
}

DateTimeInput.propTypes = propTypes

export default DateTimeInput
