import { useLocation } from "react-router-dom";
import { useFetchPodcasts } from "./useFetchPodcasts";
import { PodcastType, EpisodeType } from "../../types";
import { useFetchEpisodes } from "./useFetchEpisodes";
import { PODCAST_URL_REGEX } from "../../constants";

export type FetchedData = {
  podcasts?: PodcastType[];
  episodes?: EpisodeType[];
  isLoading: boolean;
};

export const useFetch = (): FetchedData => {
  const { pathname } = useLocation();
  const pathArray = pathname.split("/");
  const podcastId = pathArray[2];

  const podcasts = useFetchPodcasts();
  const episodes = useFetchEpisodes(podcastId || "");
  if (pathname === "/")
    return {
      isLoading: podcasts.isLoading,
      podcasts: podcasts.data,
    };
  if (PODCAST_URL_REGEX.test(pathname)) {
    return {
      isLoading: episodes.isLoading || podcasts.isLoading,
      episodes: episodes.data,
      podcasts: podcasts.data,
    };
  }
  return { isLoading: true };
};
