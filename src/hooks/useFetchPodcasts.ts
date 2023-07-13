import { ALL_PODCASTS_URL } from "../constants";
import { PodcastType } from "../types";
import { fetcher } from "./utils";
import { useFetchWithCache } from "./useFetchWithCache";

interface AllPodcastsResponse {
  feed: {
    entry: PodcastResponse[];
  };
}

interface PodcastResponse {
  id: {
    attributes: {
      "im:id": string;
    };
  };
  "im:name": {
    label: string;
  };
  "im:image": {
    label: string;
  }[];
  "im:artist": {
    label: string;
  };
  summary: {
    label: string;
  };
}

const parseTopPodcasts = (data: AllPodcastsResponse) =>
  data.feed.entry.map(
    (podcast) =>
      ({
        id: podcast.id.attributes["im:id"],
        title: podcast["im:name"].label,
        author: podcast["im:artist"].label,
        description: podcast.summary.label,
        imageUrl: podcast["im:image"][2].label,
      } as PodcastType)
  );

type FetchedAllPodcasts = {
  data?: PodcastType[];
  isLoading: boolean;
};

export const useFetchPodcasts = (): FetchedAllPodcasts => {
  const { data, isLoading } = useFetchWithCache(ALL_PODCASTS_URL, (url) =>
    fetcher<PodcastType[]>(url, parseTopPodcasts)
  );

  return {
    data,
    isLoading,
  };
};
