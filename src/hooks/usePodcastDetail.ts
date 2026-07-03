import { useQuery } from "@tanstack/react-query";
import { fetchPodcastDetail } from "@api/podcastDetailApi";
import { episodeAdapter } from "@adapters/episodeAdapter";
import type { IPodcastDetailResult } from "@models/Podcast";
import { lookupPodcastAdapter } from "@adapters/podcastAdapter";

export const usePodcastDetail = (podcastId: string) => {
  return useQuery<IPodcastDetailResult>({
    queryKey: ["podcast", podcastId],
    queryFn: async () => {
      const data = await fetchPodcastDetail(podcastId);
      const [podcastRaw, ...episodesRaw] = data.results;

      return {
        podcast: lookupPodcastAdapter(podcastRaw as never),
        episodes: episodesRaw
          .filter((r) => r.kind === "podcast-episode")
          .map(episodeAdapter),
      };
    },
    enabled: !!podcastId,
  });
};
