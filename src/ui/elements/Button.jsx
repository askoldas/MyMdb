import '@/styles/elements/button.scss'

export function Button({ type = 'primary', size = 'medium', onClick, disabled = false, children }) {
  return (
    <button
      className={`button button--${type} button--${size}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
