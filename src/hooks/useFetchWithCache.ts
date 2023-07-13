import { useEffect, useState } from "react";
import { DAY_IN_MS } from "../constants";
import { useLocation } from "react-router-dom";

type CachedData = {
  data: any;
  timestamp: number;
};

const setDataInCache = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify({ data, timestamp: Date.now() }));
};

const getDataFromCache = (key: string) => {
  const cachedData = localStorage.getItem(key);
  if (!cachedData) return null;

  const { data, timestamp } = JSON.parse(cachedData) as CachedData;

  const isDataFresh = Date.now() - timestamp < DAY_IN_MS;

  return isDataFresh ? data : null;
};

export const useFetchWithCache = (
  url: string | null,
  fetcher: (url: string) => Promise<any>
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(undefined);
  const { pathname } = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      if (!url) return;

      const cachedData = getDataFromCache(url);
      if (cachedData) {
        setData(cachedData);
        return;
      }

      setIsLoading(true);
      const fetchedResult = await fetcher(url);
      if (fetchedResult) {
        setData(fetchedResult);
        setDataInCache(url, fetchedResult);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [pathname]);

  return { data, isLoading };
};
