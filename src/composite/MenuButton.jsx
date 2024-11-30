import { IconButton } from '@/components/IconButton';
import MenuIcon from '@/assets/icons/Menu.svg';


export function MenuButton({ onClick }) {
  return <IconButton icon={MenuIcon} ariaLabel="Open menu" onClick={onClick} />;
}
