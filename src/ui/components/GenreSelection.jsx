import { useState, useEffect } from 'react'
import { GENRE_MAP } from '@/config/genres'
import { Dropdown } from '@/ui/elements/Dropdown'
import '@/styles/components/genre-selection.scss'

export function GenreSelection({ onChange, value = [] }) {
  const [availableGenres, setAvailableGenres] = useState(Object.entries(GENRE_MAP))

  useEffect(() => {
    if (value) {
      const selectedGenreIds = value.map((genre) => genre.id)
      setAvailableGenres(
        Object.entries(GENRE_MAP).filter(([id]) => !selectedGenreIds.includes(parseInt(id, 10)))
      )
    }
  }, [value])

  const handleGenreSelect = (selectedGenreId) => {
    if (!selectedGenreId) return

    const selectedGenreName = GENRE_MAP[selectedGenreId]
    const newSelectedGenres = [...value, { id: selectedGenreId, name: selectedGenreName }]
    const newAvailableGenres = availableGenres.filter(([id]) => parseInt(id, 10) !== selectedGenreId)

    if (onChange) {
      onChange(newSelectedGenres)
    }

    setAvailableGenres(newAvailableGenres)
  }

  const handleGenreRemove = (idToRemove) => {
    const removedGenre = value.find((genre) => genre.id === idToRemove)
    const newSelectedGenres = value.filter((genre) => genre.id !== idToRemove)
    const newAvailableGenres = [...availableGenres, [removedGenre.id, removedGenre.name]]

    if (onChange) {
      onChange(newSelectedGenres)
    }

    setAvailableGenres(newAvailableGenres)
  }

  const genreOptions = availableGenres.map(([id, name]) => ({ value: id, label: name }))

  return (
    <div className="genre-selection">
      <label className="genre-selection__label">Select a Genre</label>
      <Dropdown
        label="Select a Genre"
        options={genreOptions}
        value=""
        onChange={handleGenreSelect}
        placeholder="Select a genre"
      />
      {value.length > 0 && (
        <div className="genre-selection__list">
          {value.map((genre) => (
            <div key={genre.id} className="genre-selection__item">
              <span>{genre.name}</span>
              <button
                className="genre-selection__remove"
                onClick={() => handleGenreRemove(genre.id)}
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
