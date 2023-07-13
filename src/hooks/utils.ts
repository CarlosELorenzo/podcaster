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
  console.log("parseCorsApiResponse", data?.contents);
  return JSON.parse(data?.contents || "{}") as ApiResponseType<T>;
};
