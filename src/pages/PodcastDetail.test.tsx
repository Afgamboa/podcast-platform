import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import PodcastDetail from './PodcastDetail'
import { usePodcastDetail } from '@hooks/usePodcastDetail'

vi.mock('@hooks/usePodcastDetail', () => ({
  usePodcastDetail: vi.fn(),
}))

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}))

const mockPodcast = {
  id: '1535809341',
  name: 'The Joe Budden Podcast',
  author: 'Joe Budden',
  image: '',
  summary: 'Descripción del podcast',
}

const mockEpisodes = [
  {
    id: 1001,
    podcastId: 1535809341,
    title: 'Episodio 1',
    description: 'test',
    audioUrl: '',
    releaseDate: '2026-06-30T12:00:00Z',
    duration: 3600000,
  },
]

const renderPodcastDetail = () =>
  render(
    <MemoryRouter initialEntries={['/podcast/1535809341']}>
      <Routes>
        <Route path="/podcast/:podcastId" element={<PodcastDetail />} />
      </Routes>
    </MemoryRouter>
  )

describe('PodcastDetail', () => {
  beforeEach(() => vi.clearAllMocks())

  it('muestra spinner en estado loading', () => {
    vi.mocked(usePodcastDetail).mockReturnValue({
      data: undefined, isLoading: true, isError: false, refetch: vi.fn(),
    } as never)

    renderPodcastDetail()
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })

  it('muestra error si falla la carga', () => {
    vi.mocked(usePodcastDetail).mockReturnValue({
      data: undefined, isLoading: false, isError: true, refetch: vi.fn(),
    } as never)

    renderPodcastDetail()
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })

  it('muestra el nombre del podcast y los episodios', () => {
    vi.mocked(usePodcastDetail).mockReturnValue({
      data: { podcast: mockPodcast, episodes: mockEpisodes },
      isLoading: false, isError: false, refetch: vi.fn(),
    } as never)

    renderPodcastDetail()
    expect(screen.getByText('The Joe Budden Podcast')).toBeInTheDocument()
    expect(screen.getByText('Episodio 1')).toBeInTheDocument()
  })

  it('muestra el contador de episodios', () => {
    vi.mocked(usePodcastDetail).mockReturnValue({
      data: { podcast: mockPodcast, episodes: mockEpisodes },
      isLoading: false, isError: false, refetch: vi.fn(),
    } as never)

    renderPodcastDetail()
    expect(screen.getByText('podcastDetail.episodeCount')).toBeInTheDocument()
  })
})