// import PT from 'prop-types'

import { useFormContext } from 'react-hook-form'
import FilterableSelectInput from '../../../components/forms/FilterableSelectInput'
import { useGetPapeis } from '../../../rest/papelRestHooks'
import { useHandleOpenForm } from '../../../state/appState'
import { nullFormContext } from '../../../components/forms/Form'

const propTypes = {}

const PapelSelectInput = () => {
  const { setOpenPapelForm } = useHandleOpenForm()
  const {
    formState: { defaultValues },
  } = useFormContext() || nullFormContext

  const { data = {} } = useGetPapeis()
  const { content = [] } = data

  const options = content.map((item) => {
    return {
      label: item.descricao,
      value: item,
    }
  })

  const defaultValue = (defaultValues?.papeis || []).map((p) => {
    return {
      ...p,
      label: p.descricao,
    }
  })

  const cn = {
    footer: 'w-full flex justify-end relative top-[-12px] mb-3',
    subText:
      'text-xs text-gray-400 cursor-pointer hover:text-gray-200 text-right whitespace-pre',
  }

  return (
    <div>
      <FilterableSelectInput
        name="papeis"
        label={'Função'}
        options={options}
        defaultValue={defaultValue}
        isMulti
      />
      <div className={cn.footer}>
        <div className={cn.subText} onClick={() => setOpenPapelForm(true)}>
          {`Não encontrou a função que procura?\nClique aqui para adicioná-la.`}
        </div>
      </div>
    </div>
  )
}
PapelSelectInput.propTypes = propTypes
export default PapelSelectInput
