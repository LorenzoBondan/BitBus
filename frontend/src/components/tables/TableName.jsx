import React from 'react'
import PT from 'prop-types'
import { classNames } from '../../utils/styleUtils'

//*****************************************************************************
// Interface
//*****************************************************************************

const propTypes = {
  name: PT.string,
  onClick: PT.func,
  className: PT.string, // applied to root container
}

const defaultProps = {
  name: '',
  onClick: null,
  className: '',
}

//*****************************************************************************
// Components
//*****************************************************************************

const TableName = ({ name, onClick, className }) => {

  const cn = {
    root: classNames(
      'text-lg font-semibold cursor-default',
      onClick ? 'underline hover:cursor-pointer hover:text-primary' : '',
      className
    )
  }
  return (
    <div className={cn.root} {...{ onClick }}>
      {name}
    </div>
  )
}

TableName.propTypes = propTypes
TableName.defaultProps = defaultProps

export default TableName
