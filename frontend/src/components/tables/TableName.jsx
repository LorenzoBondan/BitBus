import PT from 'prop-types'
import { classNames } from '../../utils/styleUtils'

const propTypes = {
  name: PT.string,
  subtext: PT.string,
  onClick: PT.func,
  className: PT.string, // applied to root container
}

const TableName = ({
  name = '',
  onClick = null,
  className = '',
  subtext = '',
}) => {
  const cn = {
    name: classNames(
      'text-xl font-semibold cursor-default text-start leading-7',
      onClick ? 'underline hover:cursor-pointer hover:text-green-500' : '',
      className
    ),
    subtext: 'leading-3 text-xs text-zinc-700 whitespace-pre text-start',
  }
  return (
    <>
      <div className={cn.name} {...{ onClick }}>
        {name}
      </div>
      <div className={cn.subtext}>{subtext}</div>
    </>
  )
}

TableName.propTypes = propTypes

export default TableName
