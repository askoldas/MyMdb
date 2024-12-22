import { IconButton } from '@/ui/elements/ButtonIcon'
import MenuIcon from '@/assets/icons/Menu.svg'

export function MenuButton({ onClick }) {
  return <IconButton icon={MenuIcon} onClick={onClick} ariaLabel="Toggle menu" />
}

