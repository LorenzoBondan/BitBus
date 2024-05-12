import { useState } from 'react'
import PT from 'prop-types'
import EditIcon from '../icons/EditIcon'
import DeleteIcon from '../icons/DeleteIcon'
import Confirm from '../ui/Confirm'
import ViewIcon from '../icons/ViewIcon'

const propTypes = {
  name: PT.string,
  onDelete: PT.func,
  onEdit: PT.func,
  onView: PT.func,
  className: PT.string,
}

const ManageControls = ({ onDelete, onEdit, onView, name, className = '' }) => {
  const [confirmModalOpen, setConfirmModalOpen] = useState(false)

  const cn = {
    root: `flex flex-auto place-content-center ${className}`,
  }

  return (
    <div className={cn.root}>
      <Confirm
        modalTitle="Confirm Delete"
        modalSubtitle={`Are you sure you want to delete ${name}?`}
        modalIsOpen={confirmModalOpen}
        onDeny={() => setConfirmModalOpen(false)}
        onAccept={() => {
          setConfirmModalOpen(false)
          onDelete()
        }}
      />
      {onView && (
        <ViewIcon
          className="mt-[2px]"
          highlightOnHover
          onClick={onView}
          size="md"
        />
      )}
      {onEdit && (
        <EditIcon
          className="mt-[2px]"
          highlightOnHover
          onClick={onEdit}
          size="md"
        />
      )}
      {onDelete && (
        <DeleteIcon
          size="lg"
          highlightOnHover
          onClick={() => setConfirmModalOpen(true)}
          className="mt-[0.5px]"
        />
      )}
    </div>
  )
}

ManageControls.propTypes = propTypes

export default ManageControls
