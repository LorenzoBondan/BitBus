import React from 'react'
import PT from 'prop-types'
//*****************************************************************************
// Interface
//*****************************************************************************
const propTypes = {
  title: PT.node,
  className: PT.string, // applied to root container
}
const defaultProps = {
  className: '',
}
//*****************************************************************************
// Components
//*****************************************************************************
const FormTitle = ({ title, className }) => {

  const cn = {
    root: `text-base text-gdb-blue pb-1 pr-1 ${className}`,
  }
  return <div className={cn.root}>{title}</div>
}

FormTitle.propTypes = propTypes
FormTitle.defaultProps = defaultProps
export default FormTitle
