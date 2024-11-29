import React from 'react'
import '@/styles/App.scss'
import { Card } from '../components/Card'

export function MovieList({ items = [], loading }) {
  if (loading) {
    return (
      <div className="movie-list">
        {Array.from({ length: 8 }).map((_, index) => (
          <Card key={index} loading={true} />
        ))}
      </div>
    )
  }

  return (
    <div className="movie-list">
      {items.map((item) => (
        <Card
          key={item.id}
          loading={false}
          title={item.title}
          poster={item.poster_path}
        />
      ))}
    </div>
  )
}
