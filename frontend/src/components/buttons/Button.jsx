import React from 'react'
import PT from 'prop-types'
import { noop } from 'ramda-adjunct'

const parentButtonPropsShape = {
  type: PT.oneOf(['submit', 'reset']), // put these two in own form buttons
  form: PT.string, // name of the form associated with Submit button
}

const propTypes = {
  text: PT.string,
  onClick: PT.func,
  icon: PT.element,
  solid: PT.bool, // display as solid button?
  disabled: PT.bool, // is button disabled
  parentButtonProps: PT.shape(parentButtonPropsShape),
  title: PT.string, // on hover text
  className: PT.string, // className string applied to root of this component
}

const Button = (props) => {
  const {
    solid = true,
    text = 'No Text',
    onClick = () => noop,
    icon,
    className = '',
    parentButtonProps = {},
    title = '',
    disabled = false,
  } = props

  const { type = 'button', form } = parentButtonProps

  const baseCn =
    'border border-green-500 font-medium text-sm text-zinc-200 py-2 px-6 rounded-full'

  const fillCn = (solid) => {
    if (solid) {
      if (disabled) return 'bg-zinc-300'
      return 'bg-green-500 hover:bg-green-400 hover:border-green-400'
    }
    if (disabled) return 'bg-zinc-300'
    return 'hover:bg-white/10 text-zinc-800'
  }

  const cn = {
    root: `h-8 flex gap-1 items-center w-fit ${fillCn(
      solid
    )} ${className} ${baseCn}`,
    button: 'text-center disabled:opacity-50',
  }

  const iconStyle = {
    width: '1.25rem',
    height: '1.25rem',
    display: 'inline',
    verticalAlign: 'middle',
  }

  return (
    <div className={cn.root} {...{ onClick }}>
      {icon && React.createElement(icon, iconStyle)}
      <button className={cn.button} {...{ type, form, title, disabled }}>
        {text}
      </button>
    </div>
  )
}

Button.propTypes = propTypes
export default Button
