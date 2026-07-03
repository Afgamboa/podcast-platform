import { describe, it, expect } from 'vitest'
import { episodeAdapter } from './episodeAdapter'
import type { IAppleEpisodeResult } from '@models/Apple'

const mockEpisode: IAppleEpisodeResult = {
  trackId: 1000774137754,
  collectionId: 1846859935,
  trackName: 'Episodio test',
  description: '<p>Descripción del episodio test</p>',
  episodeUrl: 'https://example.com/audio.mp3',
  releaseDate: '2026-06-25T04:00:00Z',
  trackTimeMillis: 887000,
  kind: 'podcast-episode',
}

describe('episodeAdapter', () => {
  it('extrae el id correctamente', () => {
    expect(episodeAdapter(mockEpisode).id).toBe(1000774137754)
  })

  it('extrae el podcastId correctamente', () => {
    expect(episodeAdapter(mockEpisode).podcastId).toBe(1846859935)
  })

  it('extrae el título correctamente', () => {
    expect(episodeAdapter(mockEpisode).title).toBe('Episodio test')
  })

  it('extrae la descripción correctamente', () => {
    expect(episodeAdapter(mockEpisode).description).toBe('<p>Descripción del episodio test</p>')
  })

  it('extrae el audioUrl correctamente', () => {
    expect(episodeAdapter(mockEpisode).audioUrl).toBe('https://example.com/audio.mp3')
  })

  it('usa string vacío si no hay audioUrl', () => {
    expect(episodeAdapter({ ...mockEpisode, episodeUrl: undefined }).audioUrl).toBe('')
  })

  it('usa 0 si no hay duración', () => {
    expect(episodeAdapter({ ...mockEpisode, trackTimeMillis: undefined }).duration).toBe(0)
  })
})