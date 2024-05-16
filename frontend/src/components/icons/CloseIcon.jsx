import PT from 'prop-types'
import { XMarkIcon } from '@heroicons/react/20/solid'
import { noop } from 'ramda-adjunct'

const propTypes = {
  onClick: PT.func,
  className: PT.string, // applied to root container
}

const CloseIcon = ({ onClick = noop, className }) => {
  const cn = {
    root: ` h-7 w-7 text-bdigreen ${className}`,
  }

  return (
    <div {...{ onClick }} className={cn.root}>
      <XMarkIcon />
    </div>
  )
}

CloseIcon.propTypes = propTypes

export default CloseIcon
