import PT from 'prop-types'

const propTypes = {
  label: PT.string.isRequired,
  value: PT.any.isRequired,
  className: PT.string, // applied to root container
}

const VertValueDisplay = ({ label, value, className }) => {
  const cn = {
    root: `mb-4 text-sm  ${className}`,
    label: 'text-zinc-500 ',
    value: 'text-zinc-300',
  }

  return (
    <div className={cn.root}>
      <div className={cn.label}>{label}</div>
      <div className={cn.value}>{value}</div>
    </div>
  )
}

VertValueDisplay.propTypes = propTypes

export default VertValueDisplay
