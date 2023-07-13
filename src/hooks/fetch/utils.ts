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
    console.log("fetcher:", url, data);
    if (data.contents) console.log("fetcher:", JSON.parse(data.contents));
    return parser(data);
  } catch (error) {
    console.log(error);
  }
  return [] as T;
};

export const parseCorsApiResponse = <T>(
  data: CorsApiResponse
): ApiResponseType<T> => {
  return JSON.parse(data?.contents || "{}") as ApiResponseType<T>;
};
