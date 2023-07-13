import { useState } from "react";
import { Card, PodcastSearch } from "../coponents";
import { PodcastType } from "../types";

type HomeProps = {
  data: PodcastType[];
};

export const Home = ({ data: podcasts }: HomeProps) => {
  const [filteredPodcasts, setFilteredPodcasts] = useState(podcasts);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const filtered = podcasts.filter(
      (podcast) =>
        podcast.title.toLowerCase().includes(value.toLowerCase()) ||
        podcast.author.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredPodcasts(filtered);
  };

  return (
    <>
      <PodcastSearch
        podcastCount={filteredPodcasts.length}
        handleSearch={handleSearch}
      />
      <div className="flex flex-wrap mx-auto gap-6 mb-8 max-w-6xl justify-center">
        {filteredPodcasts.map((podcast) => (
          <Card key={podcast.id} podcast={podcast} />
        ))}
      </div>
    </>
  );
};
