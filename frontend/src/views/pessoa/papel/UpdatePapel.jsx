import Modal from '../../../components/ui/Modal'
import PapelForm from '../../../forms/PapelForm'
import { useUpdatePapel } from '../../../rest/papelRestHooks'
import { useHandleOpenForm } from '../../../state/appState'
import PT from 'prop-types'

const propTypes = {
  papel: PT.object,
}

const UpdatePapel = ({ papel }) => {
  const { openPapelForm, setOpenPapelForm } = useHandleOpenForm()
  const { updatePapel } = useUpdatePapel(papel.id)

  const onSubmit = async (data) => {
    await updatePapel(data)
    setOpenPapelForm(false)
  }

  return (
    <Modal modalIsOpen={openPapelForm}>
      <PapelForm
        onSubmit={onSubmit}
        initialPapelData={papel}
        onCancel={() => setOpenPapelForm(false)}
        disableFormButtons
        title={'Alterar Função'}
      />
    </Modal>
  )
}

UpdatePapel.propTypes = propTypes
export default UpdatePapel
