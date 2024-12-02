import { UserBadge } from '@/ui/components/UserBadge'
import { FilterButton } from '@/ui/components/ButtonIconFilter'
import { Input } from '@/ui/elements/Input'
import '@/styles/sections/user-controls.scss'

export function UserControls() {
  return (
    <div className="user-controls">
      <div className="user-controls-search">
        <Input
          placeholder="Search..."
          value=""
          onChange={(value) => console.log('Search Input:', value)} // Placeholder handler
        />
      </div>
      <FilterButton />
      <UserBadge />
    </div>
  )
}
