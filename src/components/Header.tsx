import { Link } from "react-router-dom";

type HeaderProps = {
  isLoading: boolean;
};

const Loading = () => (
  <div className="flex justify-center items-center">
    <div className="flex items-center justify-center  w-5 h-5 ">
      <span className="animate-ping absolute inline-flex h-5 w-5 rounded-full bg-sky-200 opacity-75"></span>
      <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-400 opacity-80"></span>
    </div>
  </div>
);

export const Header = ({ isLoading }: HeaderProps) => {
  return (
    <div>
      <div className="py-2 container flex flex-row justify-between align-middle max-w-5xl mx-auto">
        <Link to="/">
          <h2 className="text-xl font-bold text-sky-400">Podcaster</h2>
        </Link>
        {isLoading && <Loading />}
      </div>
      <div className="border-b w-full h-0 absolute left-0" />
    </div>
  );
};

// <audio id="audio" autoPlay controls src={url} />
/*

const logResponse = (url: string) => {
  //console.log(url);
  fetch(url)
    .then((res) => {
      console.log("logResponse-0", url, res);
      return res.json();
    })
    .then((res) => {
      console.log("logResponse-1", url, res);
      return res;
    })
    .then((res) =>
      console.log(
        "logResponse-2",
        url,
        res?.contents ? res.contents : res,
        JSON.parse(res?.contents ? res.contents : res)
      )
    )
    .catch((err) => console.log("logResponse-3", url, err));
};

const url2 = "https://jbpod.libsyn.com/applepodcast";
const url3 =
"https://podcasts.apple.com/us/podcast/new-rory-mal/id1572182022";
const url = true
? "https://traffic.libsyn.com/secure/jbpod/257610311-joebuddenpodcast-ill-name-this-podcast-later-episode-60.mp3?dest-id=2422538"
: `https://api.allorigins.win/get?url=${encodeURIComponent(
  "https://traffic.libsyn.com/secure/jbpod/257610311-joebuddenpodcast-ill-name-this-podcast-later-episode-60.mp3?dest-id=2422538"
  )}`;
  
  const getPodcastUrl = (podcastId?: string) =>
  podcastId
  ? `https://api.allorigins.win/get?url=${encodeURIComponent(
    PODCAST_URL + podcastId + "&entity=podcastEpisode&limit=100"
    )}`
    : null;
    
    // logResponse(url);
    //logResponse(url2);
    //logResponse(url3);
    //logResponse(getPodcastUrl("1535809341")!);
    // const audio = fetch(url)
    //   .then((res) => res.json())
    //   .then((res) => {
      //     const parsed = JSON.parse(res);
      //     console.log(parsed);
      //     return parsed;
      //   });
      */
