import PT from 'prop-types'

const propTypes = {
  labelText: PT.string, // If labelText, will still render errorText
  errorText: PT.string, // appended to label text in red if provided
  className: PT.string, // className string applied to root of this component
  required: PT.bool, // required fields
  requiredClass: PT.string, // class for required fields
}

const FormLabel = ({ labelText, className = '', required }) => {
  const cn = {
    root: `mb-0.5 text-sm text-zinc-300 flex-row gap-3 ${className}`,
    required: 'ml-1 text-rose-300',
  }

  return (
    <div className={cn.root}>
      <label className={cn.label}>
        <span>{labelText}</span>
        {labelText && required && <span className={cn.required}>*</span>}
      </label>
    </div>
  )
}

FormLabel.propTypes = propTypes
export default FormLabel
