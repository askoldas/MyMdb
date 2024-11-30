import React from 'react';
import '@/styles/components/input.scss';

export function Input({ label, placeholder, value, onChange, disabled = false, error = '' }) {
  return (
    <div className={`input ${error ? 'input--error' : ''} ${disabled ? 'input--disabled' : ''}`}>
      {label && <label className="input__label">{label}</label>}
      <input
        className="input__field"
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
      />
      {error && <span className="input__error-text">{error}</span>}
    </div>
  );
}
