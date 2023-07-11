import { Card } from "../coponents";
import { PodcastType } from "../types";

type HomeProps = {
  data: PodcastType[];
};
export const Home = ({ data: podcasts }: HomeProps) => {
  return (
    <div className="flex flex-wrap mx-auto gap-6 mb-8 max-w-6xl justify-center">
      {podcasts.map((podcast) => (
        <Card key={podcast.id} podcast={podcast} />
      ))}
    </div>
  );
};
