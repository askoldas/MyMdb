import { IconButton } from '@/ui/elements/ButtonIcon'
import MenuIcon from '@/assets/icons/Menu.svg'

export function MenuButton({ onClick }) {
  return (
    <button className="menu-button" onClick={onClick} aria-label="Toggle menu">
      <IconButton icon={MenuIcon} />
    </button>
  )
}
