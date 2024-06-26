import Modal from '../../../components/ui/Modal'
import TipoItemForm from '../../../forms/TipoItemForm'
import { useCreateTipoItem } from '../../../rest/tipoItemRestHooks'
import { useHandleOpenForm } from '../../../state/appState'

const CreateTipoItem = () => {
  const { openTipoItemForm, setOpenTipoItemForm } = useHandleOpenForm()
  const { createTipoItem } = useCreateTipoItem()

  const onSubmit = async (data) => {
    await createTipoItem(data)
    setOpenTipoItemForm(false)
  }

  return (
    <Modal modalIsOpen={openTipoItemForm}>
      <TipoItemForm
        onSubmit={onSubmit}
        onCancel={() => setOpenTipoItemForm(false)}
        disableFormButtons
        title={'Novo tipo'}
      />
    </Modal>
  )
}

export default CreateTipoItem
