import PT from 'prop-types'

const propTypes = {
  modalIsOpen: PT.bool,
  className: PT.string, // applied to root container
  children: PT.node,
}

const Modal = ({ modalIsOpen, className, children }) => {
  const cn = {
    overlay: `${
      !modalIsOpen && 'hidden'
    } fixed top-0 left-0 flex py-[10%] justify-center w-screen h-screen bg-gray-900 bg-opacity-50 z-50`,
  }

  return (
    <div className={cn.overlay}>
      <div className={className}>{children}</div>
    </div>
  )
}

Modal.propTypes = propTypes

export default Modal
