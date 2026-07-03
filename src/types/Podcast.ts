import { IEpisode } from "./Episode";

export interface IPodcast {
  id: string;
  name: string;
  author: string;
  image: string;
  summary: string;
}

export interface IPodcastDetailResult {
  podcast: IPodcast
  episodes: IEpisode[]
}
