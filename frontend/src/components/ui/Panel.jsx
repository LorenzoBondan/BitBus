import React from 'react'
import PT from 'prop-types'

//*****************************************************************************
// Interface
//*****************************************************************************

const propTypes = {
  className: PT.string, // applied to root container
  muted: PT.bool,
  children: PT.any,
}
const defaultProps = {
  visible: true,
  muted: false,
  className: '',
}

//*****************************************************************************
// Components
//*****************************************************************************
const Panel = ({ className, children, muted }) => {

  const cn = {
    root: `${
      muted ? 'opacity-80' : ''
    } rounded-md bg-gray-800 p-6 ${className}`,
  }

  return <div className={cn.root}>{children}</div>
}
Panel.propTypes = propTypes
Panel.defaultProps = defaultProps
export default Panel
