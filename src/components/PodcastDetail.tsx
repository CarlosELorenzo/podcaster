import { PodcastType } from "../types";
import { parseTextWithLinks } from "../utils";

type PodcastDetailProps = {
  podcast: PodcastType;
};

export const PodcastDetail = ({ podcast }: PodcastDetailProps) => {
  return (
    <div className="flex flex-col justify-center overflow-hidden items-center gap-2 p-4 w-60 shadow h-fit shadow-gray-400 shrink-0">
      <img
        className="rounded-sm w-40"
        src={podcast.imageUrl}
        alt={podcast.title}
      />
      <div className="border-b w-full" />
      <div className="w-full">
        <h1 className="font-bold text-lg">{podcast.title}</h1>
        <h2>by {podcast.author}</h2>
      </div>
      <div className="border-b w-full" />
      <div className="w-full">
        <p className="font-bold">Description:</p>
        <p className="italic">{parseTextWithLinks(podcast.description)}</p>
      </div>
    </div>
  );
};
