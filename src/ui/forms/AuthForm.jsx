import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginWithEmail, signUpWithEmail } from '@/redux/auth-slice'
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

  const dispatch = useDispatch()

  const handleSubmit = async () => {
    setLoading(true)
    setError('')
    try {
      if (isSignup) {
        await dispatch(signUpWithEmail({ email, password, displayName: name })).unwrap()
      } else {
        await dispatch(loginWithEmail({ email, password })).unwrap()
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