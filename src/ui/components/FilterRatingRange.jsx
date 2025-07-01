import { Dropdown } from '@/ui/elements/Dropdown'
import '@/styles/components/filter-rating-range.scss'

export function FilterRatingRange({ value, onChange }) {
  const ratingOptions = [
    { value: '', label: 'Select Rating' },
    ...Array.from({ length: 10 }, (_, i) => {
      const rating = i + 1
      return { value: rating, label: rating.toString() }
    })
  ]

  const handleFromRatingChange = (fromRating) => {
    const parsedFromRating = parseInt(fromRating, 10)
    if (!fromRating || parsedFromRating <= (value.to || 10)) {
      onChange({ ...value, from: fromRating ? parsedFromRating : null })
    }
  }

  const handleToRatingChange = (toRating) => {
    const parsedToRating = parseInt(toRating, 10)
    if (!toRating || parsedToRating >= (value.from || 1)) {
      onChange({ ...value, to: toRating ? parsedToRating : null })
    }
  }

  return (
    <div className="filter-rating-range">
      <label className="filter-label">Rating Range</label>
      <div className="filter-rating-range__inputs">
        <Dropdown
          label="From"
          options={ratingOptions}
          value={value.from || ''}
          onChange={handleFromRatingChange}
        />
        <Dropdown
          label="To"
          options={ratingOptions}
          value={value.to || ''}
          onChange={handleToRatingChange}
        />
      </div>
    </div>
  )
}
