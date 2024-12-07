import { useState, useEffect } from 'react'
import { auth } from '@/firebase'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '@/firebase'
import { Input } from '@/ui/elements/Input'
import { Button } from '@/ui/elements/Button'
import '@/styles/pages/user-profile.scss'

export function UserProfile() {
  const [userData, setUserData] = useState(null)
  const [editMode, setEditMode] = useState(false)
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser
      if (user) {
        setName(user.displayName?.split(' ')[0] || '')
        setSurname(user.displayName?.split(' ')[1] || '')

        const userDoc = doc(db, 'users', user.uid)
        const userSnapshot = await getDoc(userDoc)
        if (userSnapshot.exists()) {
          setUserData(userSnapshot.data())
        }
      }
    }

    fetchUserData()
  }, [])

  const handleSave = async () => {
    setLoading(true)
    try {
      const user = auth.currentUser

      await user.updateProfile({
        displayName: `${name} ${surname}`
      })

      const userDoc = doc(db, 'users', user.uid)
      await updateDoc(userDoc, {
        firstName: name,
        lastName: surname
      })

      setEditMode(false)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await auth.signOut()
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <div className="user-profile">
      <h1>User Profile</h1>
      {userData ? (
        <div className="user-profile__info">
          <p>Email: {auth.currentUser.email}</p>
          {editMode ? (
            <>
              <Input
                label="First Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                label="Last Name"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
              />
              <div className="button-group">
                <Button className="save" onClick={handleSave} disabled={loading}>
                  {loading ? 'Saving...' : 'Save'}
                </Button>
                <Button className="cancel" onClick={() => setEditMode(false)}>
                  Cancel
                </Button>
              </div>
            </>
          ) : (
            <>
              <p>Name: {`${name} ${surname}`}</p>
              <Button onClick={() => setEditMode(true)}>Edit Profile</Button>
            </>
          )}
          <Button className="logout" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  )
}
