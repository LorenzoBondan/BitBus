import PT from 'prop-types'
import { EyeIcon } from '@heroicons/react/20/solid'
import BaseIcon from './BaseIcon'

//*****************************************************************************
// Interface
//*****************************************************************************

const propTypes = {
  color: PT.string,
  muted: PT.bool,
  size: PT.oneOf(['sm', 'md', 'lg']), // default is md
  highlightOnHover: PT.bool, // brighten icon on hover, default false
  onClick: PT.func, // fxn to call when icon is clicked
  className: PT.string, // applied to root container
}

const ViewIcon = ({
  onClick = () => {},
  muted = false,
  color = 'text-green-600',
  size = 'md',
  highlightOnHover = false,
  className,
}) => (
  <div className={className}>
    <BaseIcon
      Icon={EyeIcon}
      {...{ onClick, muted, color, size, highlightOnHover, className }}
    />
  </div>
)

ViewIcon.propTypes = propTypes

export default ViewIcon
