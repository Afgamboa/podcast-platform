import { describe, it, expect } from 'vitest'
import { podcastAdapter } from './podcastAdapter'
import type { IApplePodcastEntry } from '@models/Apple'

const mockEntry: IApplePodcastEntry = {
  'im:name': { label: 'The Joe Budden Podcast' },
  'im:image': [
    { label: 'https://example.com/01.jpg', attributes: { height: '55' } },
    { label: 'https://example.com/03.jpg', attributes: { height: '60' } },
    { label: 'https://example.com/02.jpg', attributes: { height: '170' } },
  ],
  'summary': { label: 'Descripción del podcast' },
  'title': { label: 'The Joe Budden Podcast - The Joe Budden Network' },
  'id': { label: 'https://podcasts.apple.com/...', attributes: { 'im:id': '1535809341' } },
  'im:artist': { label: 'The Joe Budden Network' },
}

describe('podcastAdapter', () => {
  it('extrae el id correctamente', () => {
    expect(podcastAdapter(mockEntry).id).toBe('1535809341')
  })

  it('extrae el nombre correctamente', () => {
    expect(podcastAdapter(mockEntry).name).toBe('The Joe Budden Podcast')
  })

  it('extrae el autor correctamente', () => {
    expect(podcastAdapter(mockEntry).author).toBe('The Joe Budden Network')
  })

  it('usa la imagen más grande (última del array)', () => {
    expect(podcastAdapter(mockEntry).image).toBe('https://example.com/02.jpg')
  })

  it('extrae el summary correctamente', () => {
    expect(podcastAdapter(mockEntry).summary).toBe('Descripción del podcast')
  })
})