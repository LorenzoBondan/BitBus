import PT from 'prop-types'

const propTypes = {
  title: PT.string.isRequired,
  upperText: PT.string, // text above title
  className: PT.string, // applied to root container
}

const PageTitle = ({ title, upperText, className }) => {
  const cn = {
    root: `${className}`,
    title: 'mb-4 text-2xl text-gray-800 pb-2 pr-1-bold',
    upperText: 'text-gray-600 text-sm',
  }

  return (
    <div className={cn.root}>
      <div className={cn.upperText}>{upperText}</div>
      <div className={cn.title}>{title}</div>
    </div>
  )
}
PageTitle.propTypes = propTypes
export default PageTitle
