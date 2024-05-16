import PT from 'prop-types'
import { XMarkIcon } from '@heroicons/react/20/solid'
import BaseIcon from './BaseIcon'

const propTypes = {
  color: PT.string,
  muted: PT.bool,
  size: PT.oneOf(['sm', 'md', 'lg']), // default is md
  highlightOnHover: PT.bool, // brighten icon on hover, default false
  onClick: PT.func, // fxn to call when icon is clicked
  className: PT.string, // applied to root container
}

const DeleteIcon = ({
  onClick = () => {},
  muted = false,
  color = 'text-green-600',
  size = 'md',
  highlightOnHover = false,
  className,
}) => (
  <div className={className}>
    <BaseIcon
      Icon={XMarkIcon}
      {...{ onClick, muted, color, size, highlightOnHover, className }}
    />
  </div>
)

DeleteIcon.propTypes = propTypes

export default DeleteIcon
