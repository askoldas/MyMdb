import React, { useState, useEffect } from 'react';
import { auth } from '@/firebase'; // Firebase Authentication instance
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase'; // Firestore instance
import '@/styles/pages/user-profile.scss';

export function UserProfile() {
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch user info on mount
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        setName(user.displayName?.split(' ')[0] || '');
        setSurname(user.displayName?.split(' ')[1] || '');

        // Fetch additional data from Firestore
        const userDoc = doc(db, 'users', user.uid);
        const userSnapshot = await getDoc(userDoc);
        if (userSnapshot.exists()) {
          setUserData(userSnapshot.data());
        }
      }
    };

    fetchUserData();
  }, []);

  const handleSave = async () => {
    setLoading(true);
    try {
      const user = auth.currentUser;

      // Update displayName in Firebase Authentication
      await updateProfile(user, {
        displayName: `${name} ${surname}`,
      });

      // Update additional fields in Firestore
      const userDoc = doc(db, 'users', user.uid);
      await updateDoc(userDoc, {
        firstName: name,
        lastName: surname,
      });

      setEditMode(false);
    } catch (error) {
      console.error('Error updating profile:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      console.log('User logged out successfully');
    } catch (error) {
      console.error('Logout failed:', error.message);
    }
  };

  return (
    <div className="user-profile">
      <h1>User Profile</h1>
      {userData ? (
        <div className="user-profile__info">
          <p>Email: {auth.currentUser.email}</p>
          {editMode ? (
            <>
              <input
                type="text"
                placeholder="First Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Last Name"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
              />
              <button onClick={handleSave} disabled={loading}>
                {loading ? 'Saving...' : 'Save'}
              </button>
              <button onClick={() => setEditMode(false)}>Cancel</button>
            </>
          ) : (
            <>
              <p>Name: {`${name} ${surname}`}</p>
              <button onClick={() => setEditMode(true)}>Edit Profile</button>
            </>
          )}
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
}
