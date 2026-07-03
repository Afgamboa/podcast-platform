export interface IApplePodcastEntry {
  'im:name': { label: string }
  'im:image': Array<{ label: string; attributes: { height: string } }>
  'summary': { label: string }
  'title': { label: string }
  'id': { label: string; attributes: { 'im:id': string } }
  'im:artist': { label: string; attributes?: { href: string } }
}

export interface IAppleTopPodcastsResponse {
  feed: {
    entry: IApplePodcastEntry[]
  }
}

export interface IAppleEpisodeResult {
  trackId: number
  collectionId: number
  trackName: string
  description?: string
  shortDescription?: string
  episodeUrl?: string
  releaseDate: string
  trackTimeMillis?: number
  kind: 'podcast' | 'podcast-episode'
  artworkUrl600?: string
  artworkUrl160?: string
  collectionName?: string
  artistName?: string
}

export interface IAppleLookupResponse {
  resultCount: number
  results: IAppleEpisodeResult[]
}