import React from 'react';
import '@/styles/elements/toggle-button.scss';

export function ToggleButton({ isActive, onToggle, activeIcon, inactiveIcon, label }) {
  const handleClick = () => {
    console.log(`Button clicked. Current state: ${isActive}`);
    onToggle();
  };

  return (
    <button
      className={`toggle-button ${isActive ? 'active' : ''}`}
      onClick={handleClick}
      aria-label={label}
    >
      {isActive ? activeIcon : inactiveIcon}
    </button>
  );
}
