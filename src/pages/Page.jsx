import '@/styles/pages/page.scss'
import { UserControls } from '@/ui/sections/UserControls'

export function Page({ children }) {
  return (
  <>
  <UserControls />
  <div className="page">{children}</div>
  </>
  )
}
