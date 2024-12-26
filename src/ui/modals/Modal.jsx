import '@/styles/modals/modal.scss'

export function Modal({ isOpen, onClose, children }) {
  if (!isOpen) {
    return null
  }

  return (
    <div className="modal">
      <div
        className="modal__overlay"
        onClick={() => {
          if (onClose) onClose()
        }}
      ></div>
      <div className="modal__content">
        <button
          className="modal__close"
          onClick={(e) => {
            e.stopPropagation()
            if (onClose) onClose()
          }}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  )
}