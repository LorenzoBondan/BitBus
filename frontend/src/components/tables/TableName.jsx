import PT from 'prop-types'
import { classNames } from '../../utils/styleUtils'

const propTypes = {
  name: PT.string,
  onClick: PT.func,
  className: PT.string, // applied to root container
}

const TableName = ({ name = '', onClick = null, className = '' }) => {
  const cn = {
    root: classNames(
      'text-lg font-semibold cursor-default',
      onClick ? 'underline hover:cursor-pointer hover:text-green-500' : '',
      className
    ),
  }
  return (
    <div className={cn.root} {...{ onClick }}>
      {name}
    </div>
  )
}

TableName.propTypes = propTypes

export default TableName
