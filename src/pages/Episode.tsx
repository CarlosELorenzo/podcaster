import { useLocation } from "react-router-dom";
import { PodcastDetail } from "../components";
import { EpisodeType, PodcastType } from "../types";
import { parseTextWithLinks } from "../utils";

type EpisodeProps = {
  podcasts: PodcastType[];
  episodes: EpisodeType[];
};

export const Episode = ({ podcasts, episodes }: EpisodeProps) => {
  const { pathname } = useLocation();
  const podcastId = pathname.split("/")[2];
  const episodeId = pathname.split("/")[4];
  const podcast = podcasts.find((podcast) => podcast.id === podcastId);
  const episode = episodes.find((episode) => episode.id === episodeId);

  if (!podcast || !episode) {
    console.error(getError(podcast, episode));
    return <></>;
  }
  return (
    <div className="my-8 flex gap-4 md:gap-20 flex-wrap md:flex-nowrap">
      <PodcastDetail podcast={podcast} />
      <div className="shadow flex flex-col gap-4 shadow-gray-400 h-fit p-8 ">
        <h2 className="font-bold text-2xl">{episode.title}</h2>
        <p className="italic">{parseTextWithLinks(episode.description)}</p>

      <div className="border-b w-full" />
        <audio className="w-full" id="audio" controls src={episode.episodeUrl} />
      </div>
    </div>
  );
};

function getError(
  podcast: PodcastType | undefined,
  episode: EpisodeType | undefined
) {
  if (!podcast && !episode) {
    return "Podcast and episode not found";
  }
  if (!podcast) {
    return "Podcast not found";
  }
  return "Episode not found";
}
