import PT from 'prop-types'
import { ClipboardIcon } from '@heroicons/react/20/solid'
import BaseIcon from './BaseIcon'

const propTypes = {
  color: PT.string,
  muted: PT.bool,
  size: PT.oneOf(['sm', 'md', 'lg']), // default is md
  highlightOnHover: PT.bool, // brighten icon on hover, default false
  className: PT.string, // applied to root container
}

const CopyIcon = ({
  muted = false,
  color = 'text-green-600',
  size = 'md',
  highlightOnHover = false,
  className,
}) => {
  return (
    <div className={className}>
      <BaseIcon
        {...{ muted, color, size, highlightOnHover }}
        Icon={ClipboardIcon}
      />
    </div>
  )
}

CopyIcon.propTypes = propTypes

export default CopyIcon
