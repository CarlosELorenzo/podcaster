export interface ApiResponseType<T> {
  resultCount: number;
  results: T[];
}

interface CorsApiResponse {
  contents: string;
  status: any;
}

export const fetcher = async <T>(
  url: string,
  parser: (data: any) => T
): Promise<T> => {
  try {
    const data = await (await fetch(url)).json();
    return parser(data);
  } catch (error) {
    console.error(error);
  }
  return [] as T;
};

export const parseCorsApiResponse = <T>(
  data: CorsApiResponse
): ApiResponseType<T> => {
  return JSON.parse(data?.contents || "{}") as ApiResponseType<T>;
};

export function msToTime(duration: number) {
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
