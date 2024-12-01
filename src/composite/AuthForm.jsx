import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/firebase'; // Ensure auth and db are imported

export function AuthForm({ onClose }) {
  const [isSignup, setIsSignup] = useState(true); // Toggle between login and signup
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); // For signup only
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      if (isSignup) {
        // Sign Up Flow
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        // Update display name in Firebase Auth
        await updateProfile(userCredential.user, { displayName: name });

        // Store additional user data in Firestore
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          name: name,
          email: email,
          createdAt: new Date(),
        });

        console.log('User successfully signed up and added to Firestore!');
      } else {
        // Log In Flow
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log('User logged in:', userCredential.user);
      }

      onClose(); // Close modal after successful login/signup
    } catch (err) {
      setError(err.message);
      console.error('Error:', err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-form">
      <div className="auth-form__tabs">
        <button onClick={() => setIsSignup(true)} className={isSignup ? 'active' : ''}>
          Sign Up
        </button>
        <button onClick={() => setIsSignup(false)} className={!isSignup ? 'active' : ''}>
          Log In
        </button>
      </div>

      {/* Name input for Signup */}
      {isSignup && (
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      )}

      {/* Email and Password inputs */}
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {/* Error Message */}
      {error && <p className="error">{error}</p>}

      {/* Submit Button */}
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Loading...' : isSignup ? 'Sign Up' : 'Log In'}
      </button>
    </div>
  );
}
