import PT from 'prop-types'
import { useFormContext } from 'react-hook-form'
import AsyncSelect from 'react-select/async'
import FormInputLabel from './FormInputLabel'
import { nullFormContext } from './Form'
import { path } from 'ramda'

//*****************************************************************************
// Interface
//*****************************************************************************

const optionShape = {
  label: PT.string, // Text to show in the menu entry
  value: PT.any, // value associated with the entry
}

const propTypes = {
  name: PT.string.isRequired, // Form input name used to gather Form Data
  label: PT.string,
  defaultOptions: PT.arrayOf(PT.shape(optionShape)).isRequired,
  className: PT.string, // applied to root container
  isMulti: PT.bool, // whether input accepts more than one value
  defaultValue: PT.object,
  loadOptions: PT.func,
  required: PT.bool,
}

const defaultProps = {
  className: '',
}

//*****************************************************************************
// Components
//*****************************************************************************

const AsyncFilterableSelectInput = ({
  name,
  label,
  defaultOptions,
  className,
  isMulti,
  defaultValue,
  loadOptions,
  required,
}) => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext() || nullFormContext

  const errorTextPath = [...name.split('.'), 'message']
  const errorText = path(errorTextPath, errors)

  const cn = {
    root: `mb-3 ${className}`,
    error: 'text-red-300 font-semibold text-xs whitespace-pre-wrap',
  }

  const registerRequired = {
    value: required,
    message: `${label} é obrigatório`,
  }

  const { onBlur, ref } = register(name, { required: registerRequired })

  return (
    <div className={cn.root}>
      <FormInputLabel labelText={label} required={required} />
      <AsyncSelect
        ref={ref}
        onBlur={onBlur}
        defaultOptions={defaultOptions}
        name={name}
        defaultValue={defaultValue}
        placeholder="Selecione..."
        cacheOptions
        loadOptions={loadOptions}
        noOptionsMessage={() => 'Sem opções encontradas'}
        onChange={(option) => {
          if (isMulti) {
            setValue(
              name,
              option.map((v) => v.value)
            )
          } else {
            setValue(name, option.value)
          }
        }}
        isMulti={isMulti}
        classNames={{
          container: () =>
            ' bg-gray-900 border border-gray-600 rounded text-gray-300 px-2',
          valueContainer: () => 'text-base  bg-gray-900 rounded',
          indicatorsContainer: () => 'text-base my-2 ',
          menu: () => 'bg-gray-900 rounded mt-1.5 text-base',
          indicatorSeparator: () => 'bg-gray-300 h-6 mr-2 h-full',
          multiValue: () => 'bg-gray-800 px-2 py-1 rounded m-1',
          multiValueRemove: () => 'hover:text-red-300 ml-2',
          clearIndicator: () => 'hover:text-red-300 px-2',
          option: ({ isSelected }) =>
            isSelected
              ? 'block transition duration-200 px-2 py-1.5 cursor-pointer select-none truncate rounded text-gray-300 bg-gray-700/50'
              : 'block transition duration-200 px-2 py-1.5 cursor-pointer select-none truncate rounded text-gray-300 hover:bg-gray-700/30',
        }}
        unstyled
      />
      {errorText && <div className={cn.error}>{errorText}</div>}
    </div>
  )
}

AsyncFilterableSelectInput.propTypes = propTypes
AsyncFilterableSelectInput.defaultProps = defaultProps

export default AsyncFilterableSelectInput
