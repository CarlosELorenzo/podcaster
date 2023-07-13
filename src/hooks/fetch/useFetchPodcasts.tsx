import useSWR from "swr";
import { useEffect } from "react";
import { ALL_PODCASTS_URL } from "../../constants";
import { PodcastType } from "../../types";
import { fetcher } from "./utils";

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
        summary: podcast.summary.label,
        imageUrl: podcast["im:image"][2].label,
      }) as PodcastType
  );

type FetchedAllPodcasts = {
  data?: PodcastType[];
  isLoading: boolean;
};

export const useFetchPodcasts = (): FetchedAllPodcasts => {
  const { data, isLoading, error } = useSWR(ALL_PODCASTS_URL, (url) =>
    fetcher<PodcastType[]>(url, parseTopPodcasts)
  );

  useEffect(() => {
    if (error) console.error(error);
  }, [error]);

  return {
    data,
    isLoading,
  };
};
