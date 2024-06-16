import Modal from '../../components/ui/Modal'
import ItemDoacaoForm from '../../forms/ItemDoacaoForm'
import { useHandleOpenForm } from '../../state/appState'

const CreateItemAcervo = () => {
  const { openItemAcervoForm } = useHandleOpenForm()
  //   const { createPapel } = useCreatePapel()

  const cn = {
    container: 'overflow-y-auto px-2',
  }

  return (
    <Modal modalIsOpen={openItemAcervoForm} className={cn.container}>
      <ItemDoacaoForm disableFormButtons />
    </Modal>
  )
}

export default CreateItemAcervo
