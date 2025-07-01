import { Page } from '@/pages/Page'
import { UserProfile } from '@/ui/components/UserProfile'
import '@/styles/pages/profile-page.scss'

export function ProfilePage() {
  return (
    <Page>
      <div className="profile-page">
        <h1>Profile</h1>
        <UserProfile />
      </div>
    </Page>
  )
}
