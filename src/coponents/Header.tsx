import { Link } from "react-router-dom";

type HeaderProps = {
  isLoading?: boolean;
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
      <div className="border-b w-full h-1 absolute left-0" />
    </div>
  );
};
