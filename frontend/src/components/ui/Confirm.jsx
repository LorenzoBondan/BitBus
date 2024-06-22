import PT from 'prop-types'
import Modal from './Modal'
import Button from '../buttons/Button'

const propTypes = {
  modalTitle: PT.node, // string, component, etc
  modalSubtitle: PT.node,
  modalIsOpen: PT.bool,
  onAccept: PT.func,
  onDeny: PT.func,
  className: PT.string, // applied to root container
}

const Confirm = (props) => {
  const {
    modalTitle = null,
    modalSubtitle = null,
    modalIsOpen = false,
    onAccept = () => console.error('Confirm: no onAccept() provided'),
    onDeny = () => console.error('Confirm: no onDeny() provided'),
    className = '',
  } = props

  const cn = {
    root: `p-4 rounded-lg bg-gray-200 w-fit h-fit ${className}`,
    title: 'text-black mb-3 text-xl font-semibold text-start',
    buttonContainer: 'flex flex-row gap-2 justify-end',
    subtitle: 'text-gray-800 font-semibold mt-2 mb-6',
  }

  return (
    <Modal modalIsOpen={modalIsOpen} className={cn.root}>
      <>
        <div className={cn.title}>{modalTitle}</div>
        <hr />
        <div className={cn.subtitle}>{modalSubtitle}</div>
        <div className={cn.buttonContainer}>
          <Button onClick={onDeny} text="Cancelar" />
          <Button onClick={onAccept} text="Confirmar" />
        </div>
      </>
    </Modal>
  )
}

Confirm.propTypes = propTypes

export default Confirm
