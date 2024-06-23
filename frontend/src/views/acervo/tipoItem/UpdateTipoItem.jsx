import Modal from '../../../components/ui/Modal'
import TipoItemForm from '../../../forms/TipoItemForm'
import { useUpdateTipoItem } from '../../../rest/tipoItemRestHooks'
import { useHandleOpenForm } from '../../../state/appState'
import PT from 'prop-types'

const propTypes = {
  tipoItem: PT.object,
}

const UpdateTipoItem = ({ tipoItem }) => {
  const { openTipoItemForm, setOpenTipoItemForm } = useHandleOpenForm()
  const { updateTipoItem } = useUpdateTipoItem(tipoItem.id)

  const onSubmit = async (data) => {
    await updateTipoItem(data)
    setOpenTipoItemForm(false)
  }

  return (
    <Modal modalIsOpen={openTipoItemForm}>
      <TipoItemForm
        onSubmit={onSubmit}
        initialTipoItemData={tipoItem}
        onCancel={() => setOpenTipoItemForm(false)}
        disableFormButtons
        title={'Alterar Tipo de Item'}
      />
    </Modal>
  )
}

UpdateTipoItem.propTypes = propTypes
export default UpdateTipoItem
