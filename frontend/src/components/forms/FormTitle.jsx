import PT from 'prop-types'

const propTypes = {
  title: PT.node,
  className: PT.string, // applied to root container
}

const FormTitle = ({ title, className = '' }) => {
  const cn = {
    root: `text-lg text-black font-semibold pb-1 pr-1 ${className}`,
  }
  return <div className={cn.root}>{title}</div>
}

FormTitle.propTypes = propTypes
export default FormTitle
