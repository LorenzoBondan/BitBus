/* eslint-disable react-hooks/rules-of-hooks */
import PT from 'prop-types'
import { useFormContext } from 'react-hook-form'
import { nullFormContext } from './Form'

const radioButtonShape = {
  label: PT.string.isRequired, // text to who next to radio button
  value: PT.string.isRequired, // unique string value to associate w the Radio button
}

const propTypes = {
  name: PT.string.isRequired, // Name associated w radio buttons in the list
  label: PT.string,
  hidden: PT.bool,
  direction: PT.oneOf(['vertical', 'horizontal']),
  defaultChecked: PT.string, // Initial button to check (one of the radioButtons[x].value)
  radioButtons: PT.arrayOf(PT.shape(radioButtonShape)),
  readOnly: PT.bool,
  required: PT.bool,
  disabled: PT.bool,
  className: PT.string, // applied to root element
}

const toId = (name, radioButtonValue) => `${name}.${radioButtonValue}`

const RadioButtonsInput = (props) => {
  const { name, label, radioButtons, disabled = false, hidden = false } = props
  const {
    direction = 'horizontal',
    defaultChecked = '',
    required,
    className = '',
  } = props

  if (hidden) return null

  const { register } = useFormContext() || nullFormContext
  const registerRequired = {
    value: required,
    message: `${label} é obrigatório`,
  }

  const flexDir = direction === 'horizontal' ? 'flex-row' : 'flex-column'
  const getRadioStyle = (row) =>
    direction === 'horizontal' && row !== 0 ? 'flex-3' : ''

  const cn = {
    root: className,
    buttonContainer: `flex ${flexDir}`,
    label: 'fakeOverlap',
    radioButton: getRadioStyle,
  }

  return (
    <div className={cn.root}>
      <div className="grid grid-cols-12 gap-4 mb-2">
        <div className="col-span-2 text-white/50">
          {label && <label className={cn.label}>{label}</label>}
        </div>
        <div className="col-span-10 text-white/50">
          <div className={cn.buttonContainer}>
            {radioButtons.map(({ label, value }, row) => {
              return (
                <div key={value}>
                  <input
                    className={cn.radioButton(row)}
                    id={toId(name, value)}
                    defaultChecked={value === defaultChecked}
                    type="radio"
                    {...{ name, value, disabled }}
                    {...register(name, { required: registerRequired })}
                  />
                  <label
                    key={value}
                    className="pl-1 pr-3"
                    htmlFor={toId(name, value)}
                  >
                    {label}
                  </label>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

RadioButtonsInput.propTypes = propTypes

export default RadioButtonsInput
