import PT from 'prop-types'

const propTypes = {
  className: PT.string, // applied to root container
  muted: PT.bool,
  children: PT.any,
}

const Panel = ({ className = '', children, muted = false }) => {
  const cn = {
    root: `${
      muted ? 'opacity-80' : ''
    } rounded-md bg-gray-800 p-6 ${className}`,
  }

  return <div className={cn.root}>{children}</div>
}
Panel.propTypes = propTypes
export default Panel
