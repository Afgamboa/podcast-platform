import type { IAppleEpisodeResult } from '@models/Apple'
import type { IEpisode } from '@models/Episode'

export const episodeAdapter = (result: IAppleEpisodeResult): IEpisode => ({
  id: result.trackId,
  podcastId: result.collectionId,
  title: result.trackName,
  description: result.description ?? result.shortDescription ?? '',
  audioUrl: result.episodeUrl ?? '',
  releaseDate: result.releaseDate,
  duration: result.trackTimeMillis ?? 0,
})