import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Page } from '@/ui/pages/Page'
import { Button } from '@/ui/elements/Button'
import { MenuButton } from '@/ui/components/ButtonIconMenu'
import { FilterButton } from '@/ui/components/ButtonIconFilter'
import { Input } from '@/ui/elements/Input'
import { IconButton } from '@/ui/elements/ButtonIcon'
import MenuIcon from '@/assets/icons/Menu.svg'
import FilterIcon from '@/assets/icons/Filter.svg'
import '@/styles/pages/home-page.scss'

export function HomePage() {
  const [inputValue, setInputValue] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleInputChange = (value) => {
    setInputValue(value)
    if (value.length < 3) {
      setError('Value must be at least 3 characters long')
    } else {
      setError('')
    }
  }

  const handleClick = (size) => {
    console.log(`${size} button clicked!`)
  }

  return (
    <>
      {/* Hero Section */}
      <div className="home-hero">
        <h1 className="home-title">Welcome to MyMdb</h1>
        <p className="home-subtitle">Discover your favorite movies</p>
        <Button type="primary" size="large" onClick={() => navigate('/movies')}>
          Explore
        </Button>
      </div>

      {/* Page Content */}
      <Page>
        {/* Sample Components Section */}
        <div className="home-components">
          <section>
            <h2>Button Sizes</h2>
            <div className="button-sizes">
              <Button type="primary" size="small" onClick={() => handleClick('Small')}>
                Small Primary
              </Button>
              <Button type="secondary" size="medium" onClick={() => handleClick('Medium')}>
                Medium Secondary
              </Button>
              <Button type="primary" size="large" onClick={() => handleClick('Large')}>
                Large Primary
              </Button>
            </div>
          </section>

          <section>
            <h2>IconButton Sizes</h2>
            <div className="icon-button-sizes">
              <IconButton icon={MenuIcon} size="small" ariaLabel="Small IconButton" />
              <IconButton icon={FilterIcon} size="medium" ariaLabel="Medium IconButton" />
              <IconButton icon={MenuIcon} size="large" ariaLabel="Large IconButton" />
            </div>
          </section>

          <section>
            <MenuButton onClick={() => console.log('Menu clicked!')} />
            <FilterButton onClick={() => console.log('Filter clicked!')} />
          </section>

          <section className="home-input">
            <Input
              label="Title"
              placeholder="Type something..."
              value={inputValue}
              onChange={handleInputChange}
              error={error}
            />
          </section>
        </div>
      </Page>
    </>
  )
}
