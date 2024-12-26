import '@/styles/modals/modal.scss'

export function Modal({ isOpen, onClose, children }) {
  console.log('[Modal] Rendering with isOpen:', isOpen) // Debug log

  if (!isOpen) {
    console.log('[Modal] Modal is closed. Returning null.')
    return null
  }

  return (
    <div className="modal">
      <div
        className="modal__overlay"
        onClick={() => {
          console.log('[Modal] Overlay clicked') // Debug overlay click
          if (onClose) onClose()
        }}
      ></div>
      <div className="modal__content">
        <button
          className="modal__close"
          onClick={(e) => {
            e.stopPropagation()
            console.log('[Modal] Close button clicked') // Debug close button click
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
