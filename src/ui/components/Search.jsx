import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Input } from '@/ui/elements/Input'
import { IconButton } from '@/ui/elements/ButtonIcon'
import SearchIcon from '@/assets/icons/Search.svg'
import '@/styles/components/search.scss'

export function Search({ placeholder = 'Search...' }) {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const handleInputChange = (value) => {
    setQuery(value)
  }

  const handleSearchSubmit = (event) => {
    event.preventDefault()
    if (query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query)}&page=1`)
      setQuery('')
    }
  }

  return (
    <form className="search" onSubmit={handleSearchSubmit}>
      <Input
        placeholder={placeholder}
        value={query}
        onChange={handleInputChange}
      />
      <IconButton
        icon={SearchIcon}
        ariaLabel="Search"
        onClick={handleSearchSubmit}
      />
    </form>
  )
}
