import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/ui/elements/Button'
import { Top5 } from '@/ui/components/Top5'
import '@/styles/pages/home-page.scss'

export function HomePage() {
  const navigate = useNavigate()

  return (
    <>
      <div className="home-hero">
        <h1 className="home-title">Welcome to MyMdb</h1>
        <p className="home-subtitle">Discover your favorite movies</p>
        <Button type="primary" size="large" onClick={() => navigate('/movies')}>
          Explore
        </Button>
      </div>

      {/* Top 5 movies by genre */}
      <Top5 genre="Science Fiction" />
      <Top5 genre="Action" />
      <Top5 genre="Drama" />
      <Top5 genre="Comedy" />
      <Top5 genre="Thriller" />
      <Top5 genre="Crime" />
      <Top5 genre="Family" />
      <Top5 genre="History" />
      <Top5 genre="Fantasy" />
      <Top5 genre="Mystery" />
    </>
  )
}
