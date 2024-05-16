import PT from 'prop-types'
import { classNames } from '../../utils/styleUtils'

const propTypes = {
  Icon: PT.any.isRequired,
  color: PT.string, // default is primary
  muted: PT.bool,
  size: PT.oneOf(['sm', 'md', 'lg']), // default is md;
  highlightOnHover: PT.bool, // brighten icon on hover, default false
  onClick: PT.func, // fxn to call when icon is clicked
  className: PT.string, // applied to root container
}

const BaseIcon = ({
  onClick,
  Icon,
  muted = false,
  color = 'text-green-600',
  size = 'md',
  highlightOnHover = false,
  className = '',
}) => {
  const iconSizeStyle =
    size === 'sm'
      ? 'h-4.5 w-4.5'
      : size === 'md'
      ? 'h-5 w-5'
      : size === 'lg'
      ? 'h-6 w-6'
      : 'h-5 w-5'

  const background = highlightOnHover ? 'hover:bg-slate-500/10' : ''

  const cn = {
    root: classNames(
      'p-1 rounded-md',
      background,
      color,
      muted ? 'opacity-70' : '',
      className
    ),
    icon: iconSizeStyle,
  }

  return (
    <div {...{ onClick }} className={cn.root}>
      <Icon className={cn.icon} />
    </div>
  )
}

BaseIcon.propTypes = propTypes

export default BaseIcon
