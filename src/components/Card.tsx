import { Link } from "react-router-dom";
import { PodcastType } from "../types";

type CardProps = {
  podcast: PodcastType;
};

export const Card = ({ podcast }: CardProps) => {
  const { title, imageUrl, author } = podcast;
  return (
    <>
      <Link
        className="w-60 relative flex items-end flex-col mt-20"
        to={`/podcast/${podcast.id}`}
      >
        <img
          className="rounded-full shadow-gray-200 shadow w-32 h-32 absolute -top-16 left-[50%] transform -translate-x-1/2"
          src={imageUrl}
          alt={title}
        />
        <div className=" shadow-gray-500  text-center pt-[74px] flex w-full gap-2 rounded-sm shadow-sm p-2 flex-col items-center">
          <h3 className="text-base">{title.toUpperCase()}</h3>
          <p className="text-gray-500 text-sm">Author: {author}</p>
        </div>
      </Link>
    </>
  );
};
