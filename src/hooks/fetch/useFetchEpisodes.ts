import useSWR from "swr";
import { useEffect } from "react";
import { EpisodeType } from "../../types";
import { fetcher, parseCorsApiResponse } from "./utils";
import { PODCAST_URL } from "../../constants";

const getEpisodesUrl = (podcastId?: string) =>
  podcastId
    ? `https://api.allorigins.win/get?url=${encodeURIComponent(
        PODCAST_URL +
          podcastId +
          "&media=podcast&entity=podcastEpisode&limit=1000"
      )}`
    : null;

type PodcastResponse = {
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

  country: string;
  currency: string;
  primaryGenreName: string;
  contentAdvisoryRating: string;
  artworkUrl160: string;
  genreIds: string[];
  genres: string[];
  episodeUrl: string;
};

function msToTime(duration: number) {
  const seconds = Math.floor((duration / 1000) % 60);
  const minutes = Math.floor((duration / (1000 * 60)) % 60);
  const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  const hoursDisplay = hours > 0 ? `${hours.toString()}:` : "";
  const minutesDisplay =
    hoursDisplay.length > 0
      ? minutes.toString().padStart(2, "0")
      : minutes.toString();
  const secondsDisplay = seconds.toString().padStart(2, "0");

  return hoursDisplay + minutesDisplay + ":" + secondsDisplay;
}

const parseEpisodes = (data: any): EpisodeType[] => {
  const { resultCount, results } = parseCorsApiResponse<PodcastResponse>(data);
  return results.map((result) => {
    return {
      id: result.trackId.toString(),
      title: result.trackName,
      date: new Date(result.releaseDate).toISOString(),
      duration: msToTime(result.trackTimeMillis),
      episodeUrl: result.episodeUrl,
    } as EpisodeType;
  });
};

type FetchedEpisodes = {
  data?: EpisodeType[];
  isLoading: boolean;
};

export const useFetchEpisodes = (podcastId?: string): FetchedEpisodes => {
  const url = getEpisodesUrl(podcastId);

  const { data, isLoading, error } = useSWR(url, (url) =>
    fetcher<EpisodeType[]>(url, parseEpisodes)
  );

  useEffect(() => {
    if (error) console.error(error);
  }, [error]);

  useEffect(() => {
    if (data) console.log(data);
  }, [data]);

  return {
    data,
    isLoading: isLoading,
  };
};
