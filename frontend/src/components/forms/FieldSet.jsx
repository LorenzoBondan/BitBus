import PT from 'prop-types'
import Panel from '../ui/Panel'

const propTypes = {
  name: PT.string, // used for unique input element
  disabled: PT.bool, // are the inputs disabled?
  children: PT.oneOfType([PT.arrayOf(PT.node), PT.node]),
  withPanel: PT.bool, // default is true
  hidden: PT.bool, // default is false
  className: PT.string, // applied to root container
}

const FieldSet = ({
  name,
  hidden = false,
  disabled = false,
  className = '',
  withPanel = false,
  children,
}) => {
  const fieldSetProps = { disabled, hidden }
  if (name) fieldSetProps.id = name

  return (
    <WithPanel {...{ withPanel, className }}>
      <fieldset {...fieldSetProps}>{children}</fieldset>
    </WithPanel>
  )
}

const WithPanel = ({ withPanel, className, children }) => {
  return withPanel ? (
    <Panel {...{ className }}>{children}</Panel>
  ) : (
    <div {...{ className }}>{children}</div>
  )
}

WithPanel.propTypes = {
  withPanel: PT.bool,
  className: PT.string,
  children: PT.node,
}

FieldSet.propTypes = propTypes
export default FieldSet
