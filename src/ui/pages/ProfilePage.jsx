import React, { useState, useEffect } from 'react';
import { auth } from '@/firebase'; // Firebase Auth instance
import { doc, getDoc, updateDoc } from 'firebase/firestore'; // Firestore methods
import { db } from '@/firebase'; // Firestore instance
import '@/styles/pages/profile-page.scss';

export function ProfilePage() {
  const [userData, setUserData] = useState({ name: '', email: '' });
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });

  // Fetch user data from Firebase Auth and Firestore
  const fetchUserData = async () => {
    if (!auth.currentUser) {
      console.error('No user is logged in.');
      return;
    }

    const { displayName, email, uid } = auth.currentUser;

    // Start with data from Firebase Auth
    const initialData = {
      name: displayName || '',
      email: email || '',
    };

    try {
      // Try to fetch additional data from Firestore
      const userDocRef = doc(db, 'users', uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const firestoreData = userDocSnap.data();
        setUserData({ ...initialData, ...firestoreData });
        setFormData({ ...initialData, ...firestoreData });
      } else {
        // If Firestore document doesn't exist, use only Auth data
        setUserData(initialData);
        setFormData(initialData);
      }
    } catch (error) {
      console.error('Error fetching user data:', error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!auth.currentUser) return;

    const { uid } = auth.currentUser;

    try {
      // Update Firebase Auth `displayName`
      if (auth.currentUser.displayName !== formData.name) {
        await auth.currentUser.updateProfile({ displayName: formData.name });
      }

      // Update Firestore
      const userDocRef = doc(db, 'users', uid);
      await updateDoc(userDocRef, {
        name: formData.name,
        email: formData.email,
      });

      // Update local state
      setUserData(formData);
      setEditing(false);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error.message);
      alert('Failed to update profile.');
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      alert('You have logged out successfully.');
      window.location.reload(); // Optional: Redirect to home after logout
    } catch (error) {
      console.error('Logout failed:', error.message);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

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
              disabled // Email is typically not editable directly
            />
          ) : (
            <span>{userData.email || 'N/A'}</span>
          )}
        </div>
        <div className="profile-page__actions">
          {editing ? (
            <>
              <button onClick={handleSave} className="btn btn-primary">
                Save
              </button>
              <button onClick={() => setEditing(false)} className="btn btn-secondary">
                Cancel
              </button>
            </>
          ) : (
            <button onClick={() => setEditing(true)} className="btn btn-primary">
              Edit Profile
            </button>
          )}
        </div>
        <button onClick={handleLogout} className="btn btn-danger">
          Log Out
        </button>
      </div>
    </div>
  );
}
