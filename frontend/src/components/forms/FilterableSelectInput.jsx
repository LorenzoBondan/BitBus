import PT from 'prop-types'
import { useFormContext } from 'react-hook-form'
import Select from 'react-select'
import FormInputLabel from './FormInputLabel'
import { nullFormContext } from './Form'

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
  options: PT.arrayOf(PT.shape(optionShape)).isRequired,
  className: PT.string, // applied to root container
  isMulti: PT.bool, // whether input accepts more than one value
  defaultValue: PT.object,
}

const defaultProps = {
  className: '',
}

//*****************************************************************************
// Components
//*****************************************************************************

const FilterableSelectInput = ({
  name,
  label,
  options,
  className,
  isMulti,
  defaultValue,
}) => {
  const { register, setValue } = useFormContext() || nullFormContext

  const cn = {
    root: `mb-3 ${className}`,
  }

  const { onBlur, ref } = register(name, { required: false })

  return (
    <div className={cn.root}>
      <FormInputLabel labelText={label} />
      <Select
        ref={ref}
        onBlur={onBlur}
        options={options}
        name={name}
        defaultValue={defaultValue}
        placeholder="Selecione..."
        noOptionsMessage={() => 'Sem opções encontradas'}
        onChange={(option) => {
          if (isMulti) {
            setValue(
              name,
              option.map((v) => v.value)
            )
          } else setValue(name, option.value)
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
    </div>
  )
}

FilterableSelectInput.propTypes = propTypes
FilterableSelectInput.defaultProps = defaultProps

export default FilterableSelectInput
