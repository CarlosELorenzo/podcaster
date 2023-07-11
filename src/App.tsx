import { Route, Routes } from "react-router-dom";
import { Home, Podcast, Episode } from "./pages";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/podcast/:podcastId" element={<Podcast />} />
        <Route
          path="/podcast/:podcastId/episode/:episodeId"
          element={<Episode />}
        />
      </Routes>
    </>
  );
}

export default App;
