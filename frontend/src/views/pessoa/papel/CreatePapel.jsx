import Modal from '../../../components/ui/Modal'
import PapelForm from '../../../forms/PapelForm'
import { useCreatePapel } from '../../../rest/papelRestHooks'
import { useHandleOpenForm } from '../../../state/appState'

const CreatePapel = () => {
  const { openPapelForm, setOpenPapelForm } = useHandleOpenForm()
  const { createPapel } = useCreatePapel()

  const onSubmit = async (data) => {
    await createPapel(data)
    setOpenPapelForm(false)
  }
  console.log(openPapelForm, 'kfdj')
  return (
    <Modal modalIsOpen={openPapelForm}>
      <PapelForm
        onSubmit={onSubmit}
        onCancel={() => setOpenPapelForm(false)}
        disableFormButtons
        title={'Nova Função'}
      />
    </Modal>
  )
}

export default CreatePapel
