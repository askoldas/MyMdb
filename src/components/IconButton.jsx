import '@/styles/components/icon-button.scss';

export function IconButton({ icon, ariaLabel = '', onClick, size = 'medium', disabled = false }) {
  return (
    <button
      className={`icon-button icon-button--${size}`}
      onClick={onClick}
      aria-label={ariaLabel}
      disabled={disabled}
    >
      <img src={icon} alt="" className="icon-button__icon" />
    </button>
  );
}
