import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateUserData, logout } from '@/redux/auth-slice'
import '@/styles/modals/profile-modal.scss'

export function ProfileModal({ onClose }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.displayName || '');

  const handleSave = () => {
    dispatch(updateUserData({ userId: user.uid, newData: { displayName: name } }));
    setEditing(false);
    onClose(); // Close modal after saving
  };

  const handleLogout = () => {
    dispatch(logout());
    onClose(); // Close modal after logout
  };

  return (
    <div className="profile-modal">
      <h2>User Profile</h2>
      <div className="profile-modal__field">
        <label>Name:</label>
        {editing ? (
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        ) : (
          <span>{name}</span>
        )}
      </div>
      <div className="profile-modal__field">
        <label>Email:</label>
        <span>{user?.email}</span>
      </div>
      <div className="profile-modal__actions">
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
  );
}
