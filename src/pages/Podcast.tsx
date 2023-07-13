import { useLocation } from "react-router-dom";
import { EpisodeType, PodcastType } from "../types";
import { EpisodeList, PodcastDetail } from "../components";

type PodcastProps = {
  podcasts: PodcastType[];
  episodes: EpisodeType[];
};

export const Podcast = ({ podcasts, episodes }: PodcastProps) => {
  const { pathname } = useLocation();
  const podcastId = pathname.split("/")[2];
  const podcast = podcasts.find((podcast) => podcast.id === podcastId);

  if (!podcast) {
    console.error("Podcast not found");
    return <></>;
  }

  return (
    <div className="my-8 flex gap-4 md:gap-20 flex-wrap md:flex-nowrap">
      <PodcastDetail podcast={podcast} />
      <div className="w-full">
        <div className="shadow shadow-gray-400 p-2 font-bold text-xl mb-4">
          <p>Episodes: {episodes.length}</p>
        </div>
        <EpisodeList podcast={podcast} episodes={episodes} />
      </div>
    </div>
  );
};
