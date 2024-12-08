import { useState } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { auth, db } from '@/firebase'
import { Button } from '@/ui/elements/Button'
import { Input } from '@/ui/elements/Input'
import '@/styles/forms/auth-form.scss'

export function AuthForm({ onClose }) {
  const [isSignup, setIsSignup] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    setError('')
    try {
      if (isSignup) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        await updateProfile(userCredential.user, { displayName: name })
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          name: name,
          email: email,
          createdAt: new Date()
        })
      } else {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
      }
      onClose()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-form">
      <div className="auth-form__tabs">
        <Button
          type={!isSignup ? 'primary' : 'secondary'}
          onClick={() => setIsSignup(false)}
          className={`auth-form__tab ${!isSignup ? 'active' : ''}`}
        >
          Log In
        </Button>
        <Button
          type={isSignup ? 'primary' : 'secondary'}
          onClick={() => setIsSignup(true)}
          className={`auth-form__tab ${isSignup ? 'active' : ''}`}
        >
          Sign Up
        </Button>
      </div>
      {isSignup && (
        <Input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(val) => setName(val)}
        />
      )}
      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(val) => setEmail(val)}
      />
      <Input
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(val) => setPassword(val)}
      />
      {error && <p className="error">{error}</p>}
      <Button
        type="primary"
        onClick={handleSubmit}
        disabled={loading}
        className="auth-form__submit"
      >
        {loading ? 'Loading...' : isSignup ? 'Sign Up' : 'Log In'}
      </Button>
    </div>
  )
}
