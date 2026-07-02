import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { useTopPodcasts } from '@hooks/useTopPodcasts'
import Home from './Home'

vi.mock('@hooks/useTopPodcasts', () => ({
  useTopPodcasts: vi.fn(),
}))

vi.mock('@store/filterStore', () => ({
  useFilterStore: vi.fn(() => ({
    searchTerm: '',
    setSearchTerm: vi.fn(),
  })),
}))

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}))


const mockPodcasts = [
  { id: '1', name: 'The Joe Budden Podcast', author: 'Joe Budden', image: '', summary: 'este es un resumen' },
  { id: '2', name: 'NPR Music', author: 'NPR', image: '', summary: '' },
]

const renderHome = () =>
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  )

describe('Home', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('muestra el spinner en estado loading', () => {
    vi.mocked(useTopPodcasts).mockReturnValue({
      data: undefined, isLoading: true, isError: false, refetch: vi.fn(),
    } as never)

    renderHome()
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })

  it('muestra error si falla la carga', () => {
    vi.mocked(useTopPodcasts).mockReturnValue({
      data: undefined, isLoading: false, isError: true, refetch: vi.fn(),
    } as never)

    renderHome()
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })

  it('muestra los podcasts cuando carga correctamente', () => {
    vi.mocked(useTopPodcasts).mockReturnValue({
      data: mockPodcasts, isLoading: false, isError: false, refetch: vi.fn(),
    } as never)

    renderHome()
    expect(screen.getByText('The Joe Budden Podcast')).toBeInTheDocument()
    expect(screen.getByText('NPR Music')).toBeInTheDocument()
  })

  it('muestra mensaje vacío si no hay resultados del filtro', async () => {
    const { useFilterStore } = await import('@store/filterStore')
    vi.mocked(useFilterStore).mockReturnValue({
      searchTerm: 'zzzzz', setSearchTerm: vi.fn(),
    } as never)

    vi.mocked(useTopPodcasts).mockReturnValue({
      data: mockPodcasts, isLoading: false, isError: false, refetch: vi.fn(),
    } as never)

    renderHome()
    expect(screen.getByText('home.empty')).toBeInTheDocument()
  })
})