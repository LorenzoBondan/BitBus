import PT from 'prop-types'

const propTypes = {
  children: PT.string,
}

const PageTitle = ({ children }) => {
  const cn = {
    title: 'text-3xl font-semibold text-gray-300 mb-4',
  }

  return <h1 className={cn.title}>{children}</h1>
}

PageTitle.propTypes = propTypes
export default PageTitle
