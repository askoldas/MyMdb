import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { logout } from '@/redux/auth-slice'
import { db, auth } from '@/firebase'
import { Button } from '@/ui/elements/Button'
import '@/styles/pages/profile-page.scss'

export function ProfilePage() {
  const [userData, setUserData] = useState({ name: '', email: '' })
  const [editing, setEditing] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '' })
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUserData = async () => {
      if (!auth.currentUser) return

      const { displayName, email, uid } = auth.currentUser
      const initialData = { name: displayName || '', email: email || '' }

      try {
        const userDocRef = doc(db, 'users', uid)
        const userDocSnap = await getDoc(userDocRef)

        if (userDocSnap.exists()) {
          const firestoreData = userDocSnap.data()
          setUserData({ ...initialData, ...firestoreData })
          setFormData({ ...initialData, ...firestoreData })
        } else {
          setUserData(initialData)
          setFormData(initialData)
        }
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }

    fetchUserData()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = async () => {
    if (!auth.currentUser) return

    const { uid } = auth.currentUser
    try {
      if (auth.currentUser.displayName !== formData.name) {
        await auth.currentUser.updateProfile({ displayName: formData.name })
      }

      const userDocRef = doc(db, 'users', uid)
      await updateDoc(userDocRef, {
        name: formData.name,
        email: formData.email,
      })

      setUserData(formData)
      setEditing(false)
      alert('Profile updated successfully!')
    } catch (error) {
      console.error('Error updating profile:', error)
      alert('Failed to update profile.')
    }
  }

  const handleLogout = async () => {
    setLoading(true) // Set loading state to true
    try {
      await dispatch(logout()).unwrap() // Use Redux action to handle logout
      setUserData({ name: '', email: '' }) // Clear local user data
      setFormData({ name: '', email: '' }) // Clear form data
      navigate('/') // Navigate to the homepage
    } catch (error) {
      console.error('Logout failed:', error)
      alert('Failed to log out. Please try again.')
    } finally {
      setLoading(false) // Reset loading state
    }
  }

  return (
    <div className="profile-page">
      <h1>Profile</h1>
      <div className="profile-page__container">
        <div className="profile-page__field">
          <label>Name:</label>
          {editing ? (
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          ) : (
            <span>{userData.name || 'N/A'}</span>
          )}
        </div>
        <div className="profile-page__field">
          <label>Email:</label>
          {editing ? (
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              disabled
            />
          ) : (
            <span>{userData.email || 'N/A'}</span>
          )}
        </div>
        <div className="profile-page__actions">
          {editing ? (
            <>
              <Button onClick={handleSave} type="primary" size="medium">
                Save
              </Button>
              <Button onClick={() => setEditing(false)} type="secondary" size="medium">
                Cancel
              </Button>
            </>
          ) : (
            <Button onClick={() => setEditing(true)} type="primary" size="medium">
              Edit Profile
            </Button>
          )}
        </div>
        <Button
          onClick={handleLogout}
          type="secondary"
          size="medium"
          disabled={loading} // Disable button while logging out
        >
          {loading ? 'Logging Out...' : 'Log Out'}
        </Button>
      </div>
    </div>
  )
}
