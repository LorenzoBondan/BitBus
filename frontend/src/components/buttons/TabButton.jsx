import PT from 'prop-types'

const propTypes = {
  className: PT.string, // className string applied to root of this component
  active: PT.bool,
  onClick: PT.func,
  text: PT.string,
}

const TabButton = ({
  active = false,
  onClick = () => console.log('TabButton: No OnClick registered'),
  className,
  text,
}) => {
  const commonStyle = 'w-38'
  const activeStyle = `${commonStyle} text-white bg-white/20 pt-2 pb-2 pr-7 pl-7 rounded-md`
  const inactiveStyle = `${commonStyle} text-white/30 bg-white/10 hover:bg-white/20 pt-2 pb-2 pr-7 pl-7 rounded-md`

  const cn = {
    root: ` ${className}`,
    button: (active) => (active ? activeStyle : inactiveStyle),
  }

  return (
    <div className={cn.root}>
      <button onClick={onClick} className={cn.button(active)}>
        {text}
      </button>
    </div>
  )
}

TabButton.propTypes = propTypes
export default TabButton
