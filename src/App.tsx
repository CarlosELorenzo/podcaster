import { Route, Routes } from "react-router-dom";
import { Home, Podcast, Episode } from "./pages";

import { Header } from "./components";
import { useFetch } from "./hooks/fetch/useFetch";
import { EpisodeType, PodcastType } from "./types";

function App() {
  const { podcasts, episodes, isLoading } = useFetch();
  return (
    <>
      <div className="container max-w-[80%] mx-auto px-4  w-full">
        <Header isLoading={isLoading} />
        <Routes>
          <Route
            path="/"
            element={
              podcasts ? <Home data={podcasts as PodcastType[]} /> : <></>
            }
          />
          <Route
            path="/podcast/:podcastId"
            element={
              podcasts && episodes && !isLoading ? (
                <Podcast
                  podcasts={podcasts as PodcastType[]}
                  episodes={episodes as EpisodeType[]}
                />
              ) : (
                <></>
              )
            }
          />
          <Route
            path="/podcast/:podcastId/episode/:episodeId"
            element={<Episode />}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
