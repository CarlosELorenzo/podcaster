type PodcastSearchProps = {
  podcastCount: number;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const PodcastSearch = ({
  podcastCount,
  handleSearch,
}: PodcastSearchProps) => (
  <div className="flex flex-row  items-center justify-center  w-full my-4">
    <div className="flex flex-row w-full justify-end items-center gap-4 ">
      <span className="text-white h-fit px-2  bg-sky-400 rounded-lg text-lg font-bold ">
        {podcastCount}
      </span>
      <input
        type="text"
        className="border border-gray-300 w-80 rounded-md py-1 px-2 h-10 "
        placeholder="Filter podcasts"
        onChange={handleSearch}
      />
    </div>
  </div>
);
