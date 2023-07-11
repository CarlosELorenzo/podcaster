import { useLocation } from "react-router-dom";
import { useFetchTopPodcasts } from "./useFetchTopPodcasts";
import { PodcastType } from "../../types";

export type FetchedData = {
  data?: PodcastType[];
  isLoading: boolean;
};

export const useFetch = (): FetchedData => {
  const location = useLocation();
  if (location.pathname === "/") {
    return useFetchTopPodcasts();
  }
  return { isLoading: true };
};
