import PT from 'prop-types'
import { Controller } from 'react-hook-form'
import Select from 'react-tailwindcss-select'
import FormInputLabel from './FormInputLabel'
import { isEmpty, isNil } from 'ramda'

const optionShape = {
  label: PT.string, // Text to show in the menu entry
  value: PT.any, // value associated with the entry
}

const propTypes = {
  name: PT.string.isRequired, // Form input name used to gather Form Data
  label: PT.string,
  options: PT.arrayOf(PT.shape(optionShape)).isRequired,
  className: PT.string, // applied to root container
}

const SelectMenuInput = ({ name, label, options, className = '' }) => {
  if (isNil(options) || isEmpty(options)) return null

  const cn = {
    root: `mb-3 ${className}`,
  }

  return (
    <div className={cn.root}>
      <FormInputLabel labelText={label} />
      <Controller
        name={name}
        defaultValue={options[0].value}
        render={({ field: { onChange, value } }) => (
          <Select
            options={options}
            value={options.find((option) => option.value === value)}
            onChange={(option) => onChange(option.value)}
            classNames={{
              menuButton: () =>
                'flex items-center h-8 pl-2 w-full rounded text-base bg-[#d9d9d9]',
              ChevronIcon: () => 'fill-gray-500',
              menu: 'absolute z-10 w-full bg-[#d9d9d9] rounded py-1 mt-1.5 text-base',
              listItem: ({ isSelected }) =>
                isSelected
                  ? 'block transition duration-200 px-2 py-1.5 cursor-pointer select-none truncate rounded text-gray-200 bg-green-600'
                  : 'block transition duration-200 px-2 py-1.5 cursor-pointer select-none truncate rounded text-gray-600 hover:bg-gray-400/30',
            }}
          />
        )}
      />
    </div>
  )
}

SelectMenuInput.propTypes = propTypes

export default SelectMenuInput
