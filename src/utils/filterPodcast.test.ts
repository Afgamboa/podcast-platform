import { describe, it, expect } from 'vitest'
import type { IPodcast } from '@models/Podcast'

const mockPodcasts: IPodcast[] = [
  { id: '1', name: 'The Joe Budden Podcast', author: 'Joe Budden', image: '', summary: '' },
  { id: '2', name: 'NPR Music', author: 'NPR', image: '', summary: '' },
  { id: '3', name: 'Song Exploder', author: 'Hrishikesh Hirway', image: '', summary: '' },
]

const filterPodcasts = (podcasts: IPodcast[], term: string): IPodcast[] =>
  podcasts.filter(
    (p) =>
      p.name.toLowerCase().includes(term.toLowerCase()) ||
      p.author.toLowerCase().includes(term.toLowerCase())
  )

describe('filterPodcasts', () => {
  it('retorna todos si el término está vacío', () => {
    expect(filterPodcasts(mockPodcasts, '')).toHaveLength(3)
  })

  it('filtra por nombre del podcast', () => {
    expect(filterPodcasts(mockPodcasts, 'NPR')).toHaveLength(1)
    expect(filterPodcasts(mockPodcasts, 'NPR')[0].id).toBe('2')
  })

  it('filtra por autor', () => {
    expect(filterPodcasts(mockPodcasts, 'Joe Budden')).toHaveLength(1)
  })

  it('es insensible a mayúsculas', () => {
    expect(filterPodcasts(mockPodcasts, 'npr')).toHaveLength(1)
    expect(filterPodcasts(mockPodcasts, 'NPR MUSIC')).toHaveLength(1)
  })

  it('retorna array vacío si no hay coincidencias', () => {
    expect(filterPodcasts(mockPodcasts, 'zzzzz')).toHaveLength(0)
  })
})