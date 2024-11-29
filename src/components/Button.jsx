import '@/styles/App.scss'

export function Button({ type = 'primary', onClick, disabled = false, children }) {
  return (
    <button
      className={`button button--${type}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
