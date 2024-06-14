import PT from 'prop-types'

const propTypes = {
  text: PT.any,
  className: PT.string, // applied to root container
}

const PanelTitle = ({ text = '', className = '' }) => {
  const cn = {
    root: `text-gray-300 pb-2 pr-1 ${className}`,
  }
  return <div className={cn.root}>{text}</div>
}
PanelTitle.propTypes = propTypes
export default PanelTitle
