import '@/styles/elements/input.scss'

export function Input({
  label,
  placeholder = '',
  value = '',
  onChange,
  type = 'text', // Default to 'text', but allow flexibility for other types
  disabled = false,
  error = '',
  ...props // Spread additional props for flexibility
}) {
  return (
    <div className={`input ${error ? 'input--error' : ''} ${disabled ? 'input--disabled' : ''}`}>
      {label && <label className="input__label">{label}</label>}
      <input
        className="input__field"
        type={type} // Allow the type to be passed dynamically
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)} // Safely handle onChange
        disabled={disabled}
        {...props} // Forward any additional props
      />
      {error && <span className="input__error-text">{error}</span>}
    </div>
  )
}
