import ReactDOM from 'react-dom'
import '@/styles/modals/modal.scss'

export function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null

  return ReactDOM.createPortal(
    <div className="modal">
      <div className="modal__overlay" onClick={() => onClose && onClose()}></div>
      <div className="modal__content">
        <button
          className="modal__close"
          onClick={(e) => {
            e.stopPropagation()
            onClose && onClose()
          }}
        >
          &times;
        </button>
        {children}
      </div>
    </div>,
    document.body
  )
}
