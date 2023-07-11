import { Route, Routes } from "react-router-dom";
import { Home, Podcast, Episode } from "./pages";

import { Header } from "./coponents";

function App() {
  return (
    <>
      <div className="container max-w-[80%] mx-auto px-4  w-full">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
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
