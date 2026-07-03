import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import EpisodeDetail from './EpisodeDetail'

vi.mock('@hooks/usePodcastDetail', () => ({
  usePodcastDetail: vi.fn(),
}))

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}))

import { usePodcastDetail } from '@hooks/usePodcastDetail'

const mockPodcast = {
  id: '1535809341',
  name: 'The Joe Budden Podcast',
  author: 'Joe Budden',
  image: '',
  summary: '',
}

const mockEpisode = {
  id: 1001,
  podcastId: 1535809341,
  title: 'Episodio de prueba',
  description: '<p>Descripción del episodio</p>',
  audioUrl: 'https://example.com/audio.mp3',
  releaseDate: '2026-06-30T12:00:00Z',
  duration: 3600000,
}

const renderEpisodeDetail = () =>
  render(
    <MemoryRouter initialEntries={['/podcast/1535809341/episode/1001']}>
      <Routes>
        <Route path="/podcast/:podcastId/episode/:episodeId" element={<EpisodeDetail />} />
      </Routes>
    </MemoryRouter>
  )

describe('EpisodeDetail', () => {
  beforeEach(() => vi.clearAllMocks())

  it('muestra spinner en estado loading', () => {
    vi.mocked(usePodcastDetail).mockReturnValue({
      data: undefined, isLoading: true, isError: false, refetch: vi.fn(),
    } as never)

    renderEpisodeDetail()
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })

  it('muestra error si falla la carga', () => {
    vi.mocked(usePodcastDetail).mockReturnValue({
      data: undefined, isLoading: false, isError: true, refetch: vi.fn(),
    } as never)

    renderEpisodeDetail()
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })

  it('muestra el título del episodio', () => {
    vi.mocked(usePodcastDetail).mockReturnValue({
      data: { podcast: mockPodcast, episodes: [mockEpisode] },
      isLoading: false, isError: false, refetch: vi.fn(),
    } as never)

    renderEpisodeDetail()
    expect(screen.getByText('Episodio de prueba')).toBeInTheDocument()
  })

  it('muestra el reproductor de audio', () => {
    vi.mocked(usePodcastDetail).mockReturnValue({
      data: { podcast: mockPodcast, episodes: [mockEpisode] },
      isLoading: false, isError: false, refetch: vi.fn(),
    } as never)

    renderEpisodeDetail()
    const audio = document.querySelector('audio')
    expect(audio).toBeInTheDocument()
    expect(audio?.src).toContain('example.com/audio.mp3')
  })

  it('muestra error si el episodio no existe', () => {
    vi.mocked(usePodcastDetail).mockReturnValue({
      data: { podcast: mockPodcast, episodes: [] },
      isLoading: false, isError: false, refetch: vi.fn(),
    } as never)

    renderEpisodeDetail()
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })
})