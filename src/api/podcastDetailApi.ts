import { httpClient } from '@api/httpClient'
import type { IAppleLookupResponse } from '@models/Apple'

export const fetchPodcastDetail = (podcastId: string) =>
  httpClient.get<IAppleLookupResponse>(
    `/api/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode&limit=20`
  )