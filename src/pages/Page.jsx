import '@/styles/pages/page.scss'
import { UserControls } from '@/ui/sections/UserControls'
import { Preloader } from '@/ui/components/Preloader'

export function Page({ children, loading }) {
  return (
    <>
      <UserControls />
      <div className="page">
        {loading ? <Preloader /> : children}
      </div>
    </>
  )
}
