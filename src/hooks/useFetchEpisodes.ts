import { EpisodeType } from "../types";
import { fetcher, msToTime, parseCorsApiResponse } from "./utils";
import { PODCAST_URL } from "../constants";
import { useFetchWithCache } from "./useFetchWithCache";

const getEpisodesUrl = (podcastId?: string) =>
  podcastId
    ? `https://api.allorigins.win/get?url=${encodeURIComponent(
        PODCAST_URL +
          podcastId +
          "&media=podcast&entity=podcastEpisode&limit=1000"
      )}`
    : null;

type EpisodesResponse = {
  wrapperType: string;
  kind: string;
  artistId: number;
  collectionId: number;
  trackId: number;
  artistName: string;
  collectionName: string;
  trackName: string;
  collectionCensoredName: string;
  trackCensoredName: string;
  artistViewUrl: string;
  collectionViewUrl: string;
  feedUrl: string;
  trackTimeMillis: number;
  trackViewUrl: string;
  artworkUrl30: string;
  artworkUrl60: string;
  artworkUrl100: string;
  artworkUrl600: string;
  releaseDate: string;
  collectionExplicitness: string;
  trackExplicitness: string;
  description: string;
  country: string;
  currency: string;
  primaryGenreName: string;
  contentAdvisoryRating: string;
  artworkUrl160: string;
  genreIds: string[];
  genres: string[];
  episodeUrl: string;
};

const parseEpisodes = (data: any): EpisodeType[] => {
  const { results } = parseCorsApiResponse<EpisodesResponse>(data);
  return results.map((result) => {
    return {
      id: result.trackId.toString(),
      title: result.trackName,
      date: new Date(result.releaseDate).toISOString(),
      duration: msToTime(result.trackTimeMillis),
      episodeUrl: result.episodeUrl,
      description: result.description,
    } as EpisodeType;
  });
};

type FetchedEpisodes = {
  data?: EpisodeType[];
  isLoading: boolean;
};

export const useFetchEpisodes = (podcastId?: string): FetchedEpisodes => {
  const url = getEpisodesUrl(podcastId);

  const { data, isLoading } = useFetchWithCache(url, (url: string) =>
    fetcher<EpisodeType[]>(url, parseEpisodes)
  );

  return {
    data,
    isLoading: isLoading,
  };
};
