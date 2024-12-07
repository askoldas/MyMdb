import '@/styles/elements/toggle-button.scss'

export function ToggleButton({ isActive, onToggle, label, Icon }) {
  return (
    <button
      className={`toggle-button ${isActive ? 'active' : ''}`}
      onClick={onToggle}
      aria-pressed={isActive}
      aria-label={label}
    >
      <Icon className="toggle-icon" />
    </button>
  )
}
