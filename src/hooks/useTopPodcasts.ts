import { useQuery } from '@tanstack/react-query'
import { fetchTopPodcasts } from '@api/podcastApi'
import { podcastAdapter } from '@adapters/podcastAdapter'
import type { IPodcast } from '@models/Podcast'


export const useTopPodcasts = () => {
  return useQuery<IPodcast[]>({
    queryKey: ['podcasts'],
    queryFn: async () => {
      const data = await fetchTopPodcasts()
      return data.feed.entry.map(podcastAdapter)
    },
  })
}