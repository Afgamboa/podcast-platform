import type { IAppleEpisodeResult, IApplePodcastEntry } from '@models/Apple'
import type { IPodcast } from '@models/Podcast'

export const podcastAdapter = (entry: IApplePodcastEntry): IPodcast => ({
  id: entry['id']['attributes']['im:id'],
  name: entry['im:name']['label'],
  author: entry['im:artist']['label'],
  image: entry['im:image'].at(-1)?.label ?? '',
  summary: entry['summary']?.['label'] ?? '',
})

export const lookupPodcastAdapter = (result: IAppleEpisodeResult): IPodcast => ({
  id: String(result.collectionId),
  name: result.collectionName ?? '',
  author: result.artistName ?? '',
  image: result.artworkUrl600 ?? result.artworkUrl160 ?? '',
  summary: result.description ?? '',
})