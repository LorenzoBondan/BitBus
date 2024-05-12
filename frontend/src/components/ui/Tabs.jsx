import PT from 'prop-types'
import TabButton from '../buttons/TabButton'

//*****************************************************************************
// Interface
//*****************************************************************************
const tabShape = {
  id: PT.oneOfType([PT.string, PT.number]),
  text: PT.string,
}

const propTypes = {
  tabs: PT.arrayOf(PT.shape(tabShape)),
  activeTabId: PT.string,
  onTabSelect: PT.func, // Passed associated tab when clicked
  className: PT.string, // applied to root container
  buttonStyle: PT.string,
}

const Tabs = ({
  tabs = [],
  activeTabId,
  onTabSelect = () => {
    console.log('Tabs: onTabSelect() not registered')
  },
  className = '',
}) => {
  const isActive = (id) => id === activeTabId

  const cn = {
    root: `flex text-sm flex-row gap-2 ${className}`,
  }

  return (
    <div className={cn.root}>
      {tabs.map((tab) => (
        <div key={tab.id}>
          <TabButton
            text={tab?.text}
            onClick={() => onTabSelect(tab)}
            active={isActive(tab?.id)}
            className={cn.buttonStyle}
          />
        </div>
      ))}
    </div>
  )
}

Tabs.propTypes = propTypes
export default Tabs
