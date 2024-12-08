import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { fetchSearchMovies, clearSearchResults } from '@/redux/movies-slice'
import { MoviesList } from '@/ui/sections/MoviesList'
import { Pagination } from '@/ui/components/Pagination'
import { Page } from '@/pages/Page'
import '@/styles/pages/search-results-page.scss'

export function SearchResultsPage() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('query') || ''
  const page = parseInt(searchParams.get('page'), 10) || 1

  const dispatch = useDispatch()
  const { searchResults, loading, error, totalPages } = useSelector((state) => state.movies)

  useEffect(() => {
    if (query) {
      dispatch(fetchSearchMovies({ query, page }))
    }

    return () => {
      dispatch(clearSearchResults())
    }
  }, [dispatch, query, page])

  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', newPage)
    window.history.replaceState(null, '', `?${params.toString()}`)
    dispatch(fetchSearchMovies({ query, page: newPage }))
  }

  if (loading) return <Page><p>Loading search results...</p></Page>
  if (error) return <Page><p>Error loading search results: {error}</p></Page>
  if (!searchResults || searchResults.length === 0) return <Page><p>No results found for "{query}"</p></Page>

  return (
    <Page>
      <div className="search-results-page">
        <h2>Search Results for "{query}"</h2>
        <MoviesList movies={searchResults} />
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </Page>
  )
}
