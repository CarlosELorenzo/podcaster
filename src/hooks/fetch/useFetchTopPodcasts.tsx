import useSWR from "swr";
import { useEffect } from "react";
import { ALL_PODCASTS_URL } from "../../constants";
import { PodcastType } from "../../types";
import { FetchedData } from "./useFetch";
import { fetcher } from "./utils";

interface TopPodcastsResponse {
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

const parseTopPodcasts = (data: TopPodcastsResponse) =>
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

export const useFetchTopPodcasts = (): FetchedData => {
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
