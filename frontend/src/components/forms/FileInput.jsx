import FormInput, { formInputPropTypes, pickFormProps } from './FormInput'

const propTypes = formInputPropTypes

const FileInput = (props) => {
  return (
    <FormInput
      {...{ type: 'file', name: props?.name, ...pickFormProps(props) }}
    />
  )
}

FileInput.propTypes = propTypes

export default FileInput
