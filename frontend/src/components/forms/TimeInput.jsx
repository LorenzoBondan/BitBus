import FormInput, { formInputPropTypes, pickFormProps } from './FormInput'

const propTypes = formInputPropTypes

const TimeInput = (props) => {
  return (
    <FormInput
      {...{
        type: 'time',
        defaultValue: props.defaultValue,
        ...pickFormProps(props),
        className: 'text-red',
      }}
    />
  )
}

TimeInput.propTypes = propTypes

export default TimeInput
