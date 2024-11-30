import { IconButton } from '@/components/IconButton';
import FilterIcon from '@/assets/icons/Filter.svg';

export function FilterButton({ onClick }) {
  return <IconButton icon={FilterIcon} ariaLabel="Open filters" onClick={onClick} />;
}
