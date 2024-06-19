import { useFormContext } from 'react-hook-form'
import { nullFormContext } from '../../components/forms/Form'
import PT from 'prop-types'
import { debounce } from '../../utils/generalUtils'
import { useState } from 'react'
import { useGetPessoas } from '../../rest/pessoaRestHooks'
import AsyncFilterableSelectInput from '../../components/forms/AsyncFilterableSelectInput'

const propTypes = {
  name: PT.string,
  label: PT.string,
  required: PT.bool,
}

const PalestranteSelectInput = ({ name, label, required }) => {
  const [value, setValue] = useState('')

  const {
    formState: { defaultValues },
  } = useFormContext() || nullFormContext

  const { data = [], refetch } = useGetPessoas({
    queryParams: { size: 50, sort: 'nome,ASC', nome: value },
  })

  const getOptions = (data) =>
    data.content.map((pes) => {
      return {
        label: pes.nome + ' (' + pes.email + ')',
        value: pes,
      }
    })

  const defaultValue = {
    ...defaultValues?.[name],
    label: defaultValues?.[name]
      ? defaultValues?.[name]?.nome + ' (' + defaultValues?.[name]?.email + ')'
      : '',
  }

  return (
    <div>
      <AsyncFilterableSelectInput
        required={required}
        name={name}
        label={label}
        loadOptions={(v, cb) => {
          setValue(v)
          return debounce(async () => {
            const values = await refetch()
            cb(getOptions(values.data))
          })()
        }}
        defaultOptions={getOptions(data)}
        defaultValue={defaultValue}
      />
    </div>
  )
}
PalestranteSelectInput.propTypes = propTypes
export default PalestranteSelectInput
