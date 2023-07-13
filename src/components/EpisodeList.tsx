import { Link } from "react-router-dom";
import { EpisodeType, PodcastType } from "../types";

type EpisodeListProps = {
  podcast: PodcastType;
  episodes: EpisodeType[];
};

export const EpisodeList = ({ episodes, podcast }: EpisodeListProps) => {
  return (
    <div className="shadow shadow-gray-400 text-sm p-4 mb-4">
      <table className="table-fixed w-full">
        <thead className="border-b">
          <tr>
            <th className="text-start px-2">Title</th>
            <th className="w-24 text-center">Date</th>
            <th className="w-20  text-center">Duration</th>
          </tr>
        </thead>
        <tbody>
          {episodes
            .sort((a, b) => {
              const dateA = new Date(a.date);
              const dateB = new Date(b.date);
              return dateB.getTime() - dateA.getTime();
            })
            .map((episode, i) => {
              return (
                <tr
                  key={episode.id}
                  className={`border-b ${i % 2 === 0 ? "bg-gray-50" : ""}`}
                >
                  <td className="p-2">
                    <Link
                      to={`/podcast/${podcast.id}/episode/${episode.id}`}
                      className="hover:underline text-sky-500"
                    >
                      {episode.title}
                    </Link>
                  </td>
                  <td className="w-24 text-end  px-2">
                    {formatDate(episode.date)}
                  </td>
                  <td className="w-20 text-end  px-2">{episode.duration}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${day.toString().padStart(2, "0")}/${month
    .toString()
    .padStart(2, "0")}/${year}`;
}
