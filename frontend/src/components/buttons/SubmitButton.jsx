import PT from 'prop-types'
import { noop } from 'ramda-adjunct'
import Button from './Button'

//*****************************************************************************
// Interface
//*****************************************************************************

/*
  Causes a submit event for associated form
  An optional action can be specified by supplying onClick()
*/

const propTypes = {
  text: PT.string, // defaults to 'Submit'
  onClick: PT.func, // optional, only if you need an action in addition to submit
  disabled: PT.bool, // is button disabled
  tranparent: PT.bool, // submit button is solid by default, but can make transparent
  formName: PT.string, // optional, name of assocaited form, if outcide of form component
  className: PT.string, // applied to root container
}

const SubmitButton = ({
  disabled = false,
  text = 'Submit',
  onClick = noop,
  tranparent = false,
  formName,
  className = '',
}) => {
  let parentButtonProps = { type: 'submit' }
  if (formName) parentButtonProps.form = formName

  const solid = !tranparent
  return (
    <Button
      {...{ disabled, solid, text, onClick, parentButtonProps, className }}
    />
  )
}

SubmitButton.propTypes = propTypes

export default SubmitButton
