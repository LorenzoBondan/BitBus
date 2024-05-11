import PT from 'prop-types'
import { noop } from 'ramda-adjunct'
import Button from './Button'

const propTypes = {
  text: PT.string, // defaults to 'Submit'
  onClick: PT.func, // optional, only if you need an action in addition to submit
  tranparent: PT.bool, // submit button is solid by default, but can make transparent
  formName: PT.string, // optional, name of assocaited form, if outcide of form component
  className: PT.string, // applied to root container
}

const ResetButton = ({
  text = 'Reset',
  onClick = noop,
  tranparent = false,
  formName,
  className = '',
}) => {
  let parentButtonProps = { type: 'reset' }
  if (formName) parentButtonProps.form = formName

  const solid = !tranparent
  return <Button {...{ solid, text, onClick, parentButtonProps, className }} />
}

ResetButton.propTypes = propTypes

export default ResetButton
