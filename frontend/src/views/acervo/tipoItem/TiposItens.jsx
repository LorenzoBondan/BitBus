import { useState } from 'react'
import DeleteIcon from '../../../components/icons/DeleteIcon'
import Confirm from '../../../components/ui/Confirm'
import PT from 'prop-types'
import EditIcon from '../../../components/icons/EditIcon'
import { useHandleOpenForm } from '../../../state/appState'
import Button from '../../../components/buttons/Button'
import {
  useDeleteTipoItem,
  useGetTiposItem,
} from '../../../rest/tipoItemRestHooks'
import CreateTipoItem from './CreateTipoItem'
import UpdateTipoItem from './UpdateTipoItem'

const TiposItens = () => {
  const { data } = useGetTiposItem()
  const [tipoItem, setTipoItem] = useState(null)
  const { setOpenTipoItemForm, openTipoItemForm } = useHandleOpenForm()

  const cn = {
    header: 'flex justify-end my-5',
    tag: 'flex justify-between bg-gray-200 p-2 rounded',
    grid: 'grid grid-cols-* sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 ',
  }

  return (
    <div>
      {tipoItem ? <UpdateTipoItem tipoItem={tipoItem} /> : <CreateTipoItem />}
      <div className={cn.header}>
        <Button
          onClick={() => {
            setTipoItem(null)
            setOpenTipoItemForm(!openTipoItemForm)
          }}
          text={'Novo Tipo de Item'}
        />
      </div>
      <div className={cn.grid}>
        {(data.content || data).map((tipoItem) => (
          <Tag
            key={tipoItem.id}
            tipoItem={tipoItem}
            onUpdate={() => setTipoItem(tipoItem)}
          />
        ))}
      </div>
    </div>
  )
}

export default TiposItens

const Tag = ({ tipoItem, onUpdate }) => {
  const { deleteTipoItem } = useDeleteTipoItem()
  const { setOpenTipoItemForm, openTipoItemForm } = useHandleOpenForm()
  const [confirmModalOpen, setConfirmModalOpen] = useState(false)

  const cn = {
    tag: 'flex justify-between bg-gray-200 p-2 rounded',
    actions: 'flex gap-2',
  }

  return (
    <div className={cn.tag} key={tipoItem.id}>
      <Confirm
        modalTitle="Confirmar Remoção"
        modalSubtitle={`Você tem certeza que deseja deletar ${tipoItem.descricao}?`}
        modalIsOpen={confirmModalOpen}
        onDeny={() => setConfirmModalOpen(false)}
        onAccept={() => {
          setConfirmModalOpen(false)
          deleteTipoItem(tipoItem.id)
        }}
      />
      {tipoItem.descricao}{' '}
      <div className={cn.actions}>
        <EditIcon
          highlightOnHover
          onClick={() => {
            onUpdate()
            setOpenTipoItemForm(!openTipoItemForm)
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
  tipoItem: PT.object,
  onUpdate: PT.func,
}
