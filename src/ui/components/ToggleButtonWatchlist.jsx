import React from 'react';
import { ToggleButton } from '@/ui/elements/ToggleButton';
import WatchlistIcon from '@/assets/icons/Watchlist.svg?react';

export function ToggleButtonWatchlist({ isInWatchlist, onToggleWatchlist }) {
  const handleToggle = () => {
    console.log(`Watchlist button toggled. New state: ${!isInWatchlist}`);
    onToggleWatchlist();
  };

  return (
    <div style={{ color: isInWatchlist ? 'red' : 'blue' }}> {/* Debugging color */}
      <ToggleButton
        isActive={isInWatchlist}
        onToggle={handleToggle}
        activeIcon={<WatchlistIcon className="toggle-button-icon active" />} // React component for SVG
        inactiveIcon={<WatchlistIcon className="toggle-button-icon" />}
        label="Toggle Watchlist"
      />
    </div>
  );
}
