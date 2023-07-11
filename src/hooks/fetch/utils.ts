export const fetcher = async <T>(
  url: string,
  parser: (data: any) => T
): Promise<T> => {
  try {
    const data = await (await fetch(url)).json();
    return parser(data);
  } catch (error) {
    console.log(error);
  }
  return [] as T;
};
