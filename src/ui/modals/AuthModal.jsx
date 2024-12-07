import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginWithEmail, signUpWithEmail } from '@/redux/auth-slice'
import { Input } from '@/ui/elements/Input'
import { Button } from '@/ui/elements/Button'
import '@/styles/modals/auth-modal.scss'

export function AuthModal({ isOpen, onClose }) {
  const [isSignup, setIsSignup] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      if (isSignup) {
        await dispatch(signUpWithEmail({ email, password })).unwrap()
      } else {
        await dispatch(loginWithEmail({ email, password })).unwrap()
      }
      onClose()
    } catch (err) {
      setError(err.message || 'An error occurred. Please try again.')
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="auth-modal">
        <h2>{isSignup ? 'Sign Up' : 'Log In'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="auth-modal__field">
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="auth-modal__field">
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="auth-modal__error">{error}</p>}
          <Button type="submit" className="btn-primary">
            {isSignup ? 'Sign Up' : 'Log In'}
          </Button>
        </form>
        <p
          className="auth-modal__toggle"
          onClick={() => setIsSignup((prev) => !prev)}
        >
          {isSignup
            ? 'Already have an account? Log In'
            : "Don't have an account? Sign Up"}
        </p>
      </div>
    </Modal>
  )
}
