// import PT from 'prop-types'

import { useFormContext } from 'react-hook-form'
import FilterableSelectInput from '../../../components/forms/FilterableSelectInput'
import { useGetTiposItem } from '../../../rest/tipoItemRestHooks'
import { useOpenTipoItemForm } from '../../../state/appState'
import { nullFormContext } from '../../../components/forms/Form'

const propTypes = {}

const TipoItemSelectInput = () => {
  const { setOpenTipoItemForm } = useOpenTipoItemForm()
  const {
    formState: { defaultValues },
  } = useFormContext() || nullFormContext

  const { data = {} } = useGetTiposItem()
  const { content = [] } = data

  const options = content.map((item) => {
    return {
      label: item.descricao,
      value: item.id,
    }
  })

  const defaultValue = {
    ...defaultValues?.tipoItem,
    label: defaultValues?.tipoItem?.descricao,
  }

  const cn = {
    footer: 'w-full flex justify-end relative top-[-12px] mb-3',
    subText:
      'text-xs text-gray-400 cursor-pointer hover:text-gray-200 text-right whitespace-pre',
  }

  return (
    <div>
      <FilterableSelectInput
        name="tipoItem.id"
        label={'Tipo'}
        options={options}
        defaultValue={defaultValue}
      />
      <div className={cn.footer}>
        <div className={cn.subText} onClick={() => setOpenTipoItemForm(true)}>
          {`Não encontrou o tipo que procura?\nClique aqui para adicioná-lo.`}
        </div>
      </div>
    </div>
  )
}
TipoItemSelectInput.propTypes = propTypes
export default TipoItemSelectInput
