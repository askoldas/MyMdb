import { IconButton } from '@/ui/elements/ButtonIcon'
import MenuIcon from '@/assets/icons/Menu.svg'
import '@/styles/components/button-menu.scss'

export function MenuButton({ onClick }) {
  return (
    <IconButton
      icon={MenuIcon}
      ariaLabel="Toggle menu"
      onClick={onClick}
      className="menu-button"
    />
  )
}
