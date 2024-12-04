import React from 'react';
import { Dropdown } from '@/ui/elements/Dropdown'; // Custom Dropdown import
import '@/styles/components/filter-year-range.scss';

export function FilterYearRange({ value, onChange }) {
  const yearOptions = [
    ...Array.from({ length: 66 }, (_, i) => {
      const year = 1960 + i;
      return { value: year, label: year.toString() };
    }),
  ].reverse(); // Reverse the array to show latest years first

  // Add the placeholder option at the top
  const allYearOptions = [{ value: '', label: 'Select Year' }, ...yearOptions];

  const handleFromYearChange = (fromYear) => {
    const parsedFromYear = parseInt(fromYear, 10);
    if (!fromYear || parsedFromYear <= (value.to || 2025)) {
      onChange({ ...value, from: fromYear ? parsedFromYear : null });
    }
  };

  const handleToYearChange = (toYear) => {
    const parsedToYear = parseInt(toYear, 10);
    if (!toYear || parsedToYear >= (value.from || 1960)) {
      onChange({ ...value, to: toYear ? parsedToYear : null });
    }
  };

  return (
    <div className="filter-year-range">
      <label className="filter-label">Year Range</label>
      <div className="filter-year-range__inputs">
        {/* Using custom Dropdown for "From" */}
        <Dropdown
          label="From"
          options={allYearOptions}
          value={value.from || ''}
          onChange={handleFromYearChange}
        />
        <span className="filter-range-separator">to</span>
        {/* Using custom Dropdown for "To" */}
        <Dropdown
          label="To"
          options={allYearOptions}
          value={value.to || ''}
          onChange={handleToYearChange}
        />
      </div>
    </div>
  );
}