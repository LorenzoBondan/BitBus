import PT from 'prop-types'

const propTypes = {
  text: PT.string,
  className: PT.string, // applied to root container
}

const PanelLabel = ({ text, className = '' }) => {
  const cn = {
    root: `text-lg text-black/80 ${className}`,
  }

  return <div className={cn.root}>{text}</div>
}

PanelLabel.propTypes = propTypes

export default PanelLabel
