import { httpClient } from '@api/httpClient'
import type { IAppleTopPodcastsResponse } from '@models/Apple'

export const fetchTopPodcasts = () =>
  httpClient.get<IAppleTopPodcastsResponse>('/api/top-podcasts')