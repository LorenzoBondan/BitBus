import PT from 'prop-types'
import { Link } from 'react-router-dom'
import { noop } from 'ramda-adjunct'

const propTypes = {
  text: PT.string,
  to: PT.string,
  onClick: PT.func, // action to take when Navlink clicked
  className: PT.string, // className string applied to root of this component
}

const NavText = ({ text = 'No Text', to = '', onClick = noop, className }) => {
  return (
    <Link {...{ onClick, to, className }}>
      <span className={'hover:text-primary underline'}>{text}</span>
    </Link>
  )
}

NavText.propTypes = propTypes
export default NavText
