import PT from 'prop-types'

const propTypes = {
  label: PT.string.isRequired,
  value: PT.any.isRequired,
  className: PT.string, // applied to root container
}

const ValueDisplay = ({ label, value, className }) => {
  const cn = {
    root: `text-sm mb-2 ${className}`,
    label: 'text-zinc-600',
    value: 'ml-3 break-all text-zinc-900',
  }

  return (
    <div className={cn.root}>
      <span className={cn.label}>{label}</span>
      <span className={cn.value}>{value}</span>
    </div>
  )
}

ValueDisplay.propTypes = propTypes

export default ValueDisplay
