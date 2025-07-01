import '@/styles/elements/dropdown.scss'

export function Dropdown({ label, options, value, onChange }) {
  return (
    <div className="dropdown">
      {label && <label className="dropdown__label">{label}</label>}
      <select
        className="dropdown__select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
