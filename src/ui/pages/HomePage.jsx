import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Page } from '@/ui/pages/Page'
import { Button } from '@/ui/elements/Button'
import { MenuButton } from '@/ui/components/ButtonIconMenu'
import { FilterButton } from '@/ui/components/ButtonIconFilter'
import { Input } from '@/ui/elements/Input'
import { IconButton } from '@/ui/elements/ButtonIcon'
import { UserControls } from '@/ui/sections/UserControls'
import MenuIcon from '@/assets/icons/Menu.svg'
import FilterIcon from '@/assets/icons/Filter.svg'
import '@/styles/pages/home-page.scss'

export function HomePage() {
  const [inputValue, setInputValue] = useState('')
  const [error, setError] = useState('')
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
    </>
  )
}
