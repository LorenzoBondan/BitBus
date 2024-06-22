import { useFormContext } from 'react-hook-form'
import { nullFormContext } from '../../components/forms/Form'
import PT from 'prop-types'
import { debounce } from '../../utils/generalUtils'
import { useState } from 'react'
import AsyncFilterableSelectInput from '../../components/forms/AsyncFilterableSelectInput'
import { useGetItens } from '../../rest/itemAcervoRestHooks'
import { useHandleOpenForm } from '../../state/appState'

const propTypes = {
  name: PT.string,
  label: PT.string,
  required: PT.bool,
}

const ItemAcervoSelectInput = ({ name, label, required }) => {
  const { setOpenItemAcervoForm } = useHandleOpenForm()
  const [value, setValue] = useState('')

  const {
    formState: { defaultValues },
  } = useFormContext() || nullFormContext

  const { data = [], refetch } = useGetItens({
    queryParams: { size: 50, sort: 'nome,ASC', nome: value },
  })

  const getOptions = (data) =>
    data.content
      .filter((item) => !item.doacaoId)
      .map((item) => {
        return {
          label: item.nome,
          value: item,
        }
      })

  const defaultValue = (defaultValues?.itens || []).map((p) => {
    return {
      value: p,
      label: p.nome,
    }
  })

  const cn = {
    footer: 'w-full flex justify-end relative top-[-12px] mb-3',
    subText:
      'text-xs text-gray-600 cursor-pointer hover:text-gray-800 text-right whitespace-pre',
  }

  return (
    <div>
      <AsyncFilterableSelectInput
        name={name}
        required={required}
        label={label}
        loadOptions={(v, cb) => {
          console.log(v)
          setValue(v)
          return debounce(async () => {
            const values = await refetch()
            cb(getOptions(values.data))
          })()
        }}
        isMulti
        defaultOptions={getOptions(data)}
        defaultValue={defaultValue}
      />
      <div className={cn.footer}>
        <div className={cn.subText} onClick={() => setOpenItemAcervoForm(true)}>
          {`Não encontrou o item que procura no acervo?\nClique aqui para adicioná-lo.`}
        </div>
      </div>
    </div>
  )
}
ItemAcervoSelectInput.propTypes = propTypes
export default ItemAcervoSelectInput
