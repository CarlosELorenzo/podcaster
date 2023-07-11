import { Route, Routes } from "react-router-dom";
import { Home, Podcast, Episode } from "./pages";

import { Header } from "./coponents";
import { useFetch } from "./hooks/fetch/useFetch";
import { PodcastType } from "./types";

function App() {
  const { data, isLoading } = useFetch();
  return (
    <>
      <div className="container max-w-[80%] mx-auto px-4  w-full">
        <Header isLoading={isLoading} />
        <Routes>
          <Route
            path="/"
            element={data && <Home data={data as PodcastType[]} />}
          />
          <Route path="/podcast/:podcastId" element={<Podcast />} />
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
