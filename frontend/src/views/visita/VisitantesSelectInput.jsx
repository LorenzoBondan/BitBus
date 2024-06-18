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

const VisitantesSelectInput = ({ name, label, required }) => {
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
        value: pes.id,
      }
    })

  const defaultValue = (defaultValues?.[name] || []).map((id) => {
    return {
      value: id,
      // label: p?.[name] ? p?.[name]?.nome : '',
      label: id,
    }
  })

  return (
    <div>
      <AsyncFilterableSelectInput
        required={required}
        name={name}
        label={label}
        isMulti
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
VisitantesSelectInput.propTypes = propTypes
export default VisitantesSelectInput
