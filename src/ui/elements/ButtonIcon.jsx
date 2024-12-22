import '@/styles/elements/button-icon.scss'

export function IconButton({ icon, ariaLabel = '', onClick, size = 'medium', disabled = false, className = '' }) {
  return (
    <button
      className={`icon-button icon-button--${size} ${className}`}
      onClick={onClick}
      aria-label={ariaLabel}
      disabled={disabled}
    >
      <img src={icon} alt="" className="icon-button__icon" />
    </button>
  )
}
