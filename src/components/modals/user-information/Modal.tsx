const Modal = ({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean
  onClose: Function
  children: React.ReactNode
}) => {
  if (!isOpen) return null

  return (
    <div className='modal-overlay' onClick={() => onClose()}>
      <div className='modal-content' onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}

export default Modal
