import React, { useState } from 'react';
import { Button } from '../components/Button';
import { MenuButton } from '../composite/MenuButton';
import { FilterButton } from '../composite/FilterButton';
import { Input } from '../components/Input';
import { IconButton } from '../components/IconButton';
import MenuIcon from '../assets/icons/Menu.svg';
import FilterIcon from '../assets/icons/Filter.svg';
import '@/styles/App.scss';

export function HomePage() {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (value) => {
    setInputValue(value);
    if (value.length < 3) {
      setError('Value must be at least 3 characters long');
    } else {
      setError('');
    }
  };

  const handleClick = (size) => {
    console.log(`${size} button clicked!`);
  };

  return (
    <>
      <div className="home-hero">
        <div className="home-overlay">
          <h1 className="home-title">Welcome to MyMdb</h1>
          <p className="home-subtitle">Discover your favorite movies</p>
        </div>
      </div>
      <div className="home-buttons">
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
        <h2>IconButton Sizes</h2>
        <div className="icon-button-sizes">
          <IconButton icon={MenuIcon} size="small" ariaLabel="Small IconButton" />
          <IconButton icon={FilterIcon} size="medium" ariaLabel="Medium IconButton" />
          <IconButton icon={MenuIcon} size="large" ariaLabel="Large IconButton" />
        </div>
      </div>
      <div className="home-buttons">
        <MenuButton onClick={() => console.log('Menu clicked!')} />
        <FilterButton onClick={() => console.log('Filter clicked!')} />
      </div>
      <div className="home-input">
        <Input
          label="Title"
          placeholder="Type something..."
          value={inputValue}
          onChange={handleInputChange}
          error={error}
        />
      </div>
    </>
  );
}
