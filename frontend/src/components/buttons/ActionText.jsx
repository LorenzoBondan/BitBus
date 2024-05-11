import PT from 'prop-types'

const propTypes = {
  text: PT.string,
  Icon: PT.elementType, // Icon component
  onClick: PT.func,
  className: PT.string, // className string applied to root of this component
}

const ActionText = ({
  Icon,
  text = 'No Text',
  onClick = () => {
    console.log('ActionText: No onClick handler')
  },
  className = '',
}) => {
  const cn = {
    root: `flex items-center ${className}`,
    icon: 'mr`',
  }
  return (
    <div className={cn.root} {...{ onClick }}>
      {Icon && <Icon />}
      <span
        className={`text-primary text-sm underline cursor-pointer ${className}`}
      >
        {text}
      </span>
    </div>
  )
}

ActionText.propTypes = propTypes
export default ActionText
