import { Route, Routes } from "react-router-dom";
import { Home, Podcast, Episode } from "./pages";

import { Header } from "./components";
import { useFetch } from "./hooks/useFetch";

function App() {
  const { podcasts, episodes, isLoading } = useFetch();
  return (
    <>
      <div className="container max-w-[80%] mx-auto px-4  w-full">
        <Header isLoading={isLoading} />
        <Routes>
          <Route
            path="/"
            element={podcasts ? <Home data={podcasts} /> : <></>}
          />
          <Route
            path="/podcast/:podcastId"
            element={
              podcasts && episodes && !isLoading ? (
                <Podcast podcasts={podcasts} episodes={episodes} />
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
