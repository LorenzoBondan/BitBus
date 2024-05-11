import React from 'react'
import PT from 'prop-types'

//*****************************************************************************
// Interface
//*****************************************************************************

const propTypes = {
  text: PT.string,
  className: PT.string, // applied to root container
}

const defaultProps = {
  className: '',
}

//*****************************************************************************
// Components
//*****************************************************************************

const PanelLabel = ({ text, className }) => {
  const cn = {
    root: `text-lg text-white/80 ${className}`,
  }

  return <div className={cn.root}>{text}</div>
}

PanelLabel.propTypes = propTypes
PanelLabel.defaultProps = defaultProps

export default PanelLabel

