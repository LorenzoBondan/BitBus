import { useState } from 'react'
import DeleteIcon from '../../../components/icons/DeleteIcon'
import Confirm from '../../../components/ui/Confirm'
import { useDeletePapel, useGetPapeis } from '../../../rest/papelRestHooks'
import PT from 'prop-types'
import EditIcon from '../../../components/icons/EditIcon'
import { useHandleOpenForm } from '../../../state/appState'
import UpdatePapel from './UpdatePapel'
import CreatePapel from './CreatePapel'
import Button from '../../../components/buttons/Button'

const Papeis = () => {
  const { data } = useGetPapeis()
  const [papel, setPapel] = useState(null)
  const { setOpenPapelForm, openPapelForm } = useHandleOpenForm()

  const cn = {
    header: 'flex justify-end my-5',
    tag: 'flex justify-between bg-gray-200 p-2 rounded',
    grid: 'grid grid-cols-* sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 ',
  }

  return (
    <div>
      {papel ? <UpdatePapel papel={papel} /> : <CreatePapel />}
      <div className={cn.header}>
        <Button
          onClick={() => {
            setPapel(null)
            setOpenPapelForm(!openPapelForm)
          }}
          text={'Novo Papel'}
        />
      </div>
      <div className={cn.grid}>
        {(data.content || data).map((papel) => (
          <Tag key={papel.id} papel={papel} onUpdate={() => setPapel(papel)} />
        ))}
      </div>
    </div>
  )
}

export default Papeis

const Tag = ({ papel, onUpdate }) => {
  const { deletePapel } = useDeletePapel()
  const { setOpenPapelForm, openPapelForm } = useHandleOpenForm()
  const [confirmModalOpen, setConfirmModalOpen] = useState(false)

  const cn = {
    tag: 'flex justify-between bg-gray-200 p-2 rounded',
    actions: 'flex gap-2',
  }

  return (
    <div className={cn.tag} key={papel.id}>
      <Confirm
        modalTitle="Confirmar Remoção"
        modalSubtitle={`Você tem certeza que deseja deletar ${papel.descricao}?`}
        modalIsOpen={confirmModalOpen}
        onDeny={() => setConfirmModalOpen(false)}
        onAccept={() => {
          setConfirmModalOpen(false)
          deletePapel(papel.id)
        }}
      />
      {papel.descricao}{' '}
      <div className={cn.actions}>
        <EditIcon
          highlightOnHover
          onClick={() => {
            onUpdate()
            setOpenPapelForm(!openPapelForm)
          }}
        />
        <DeleteIcon
          highlightOnHover
          onClick={() => setConfirmModalOpen(true)}
        />
      </div>
    </div>
  )
}

Tag.propTypes = {
  papel: PT.object,
  onUpdate: PT.func,
}
