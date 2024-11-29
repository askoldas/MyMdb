import React from 'react'
import { Button } from '../components/Button'
import '@/styles/App.scss' 

export function HomePage() {
  
    const handleClick = () => {
      console.log('Button clicked!')
    }
  return (
    <>
        <div className="home-hero">
      <div className="home-overlay">
        <h1 className="home-title">Welcome to MyMdb</h1>
        <p className="home-subtitle">Discover your favorite movies</p>
      </div>
    </div>
    <div>
      <Button type="primary" onClick={handleClick}>
        Primary
      </Button>
      <Button type="secondary" onClick={handleClick}>
        Secondary
      </Button>
      <Button type="primary" disabled>
        Disabled
      </Button>
    </div>
    </>
  )
}
