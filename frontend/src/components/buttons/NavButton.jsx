import PT from 'prop-types'
import { Link } from 'react-router-dom'
import Button from './Button'

//*****************************************************************************
// Interface
//*****************************************************************************

const propTypes = {
  linkto: PT.oneOfType([PT.string, PT.oneOf([-1])]).isRequired,
  text: PT.string,
  solid: PT.bool,
  title: PT.string,
  className: PT.string, // className string applied to root of this component
  icon: PT.element,
  disabled: PT.bool,
}

const NavButton = (props) => {
  const {
    solid = true,
    text = 'No Text',
    linkto,
    disabled = false,
    className = '',
    title = '',
    icon,
  } = props

  return (
    <div className={className}>
      <Link to={linkto}>
        <Button {...{ text, solid, disabled, title, icon }} />
      </Link>
    </div>
  )
}

NavButton.propTypes = propTypes
export default NavButton
