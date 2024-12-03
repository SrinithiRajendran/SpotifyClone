// eslint-disable-next-line no-unused-vars
import React from "react";
import Podcasts from "../Podcasts";
import { podcastData } from "../../assets/assets";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { useNavigate } from "react-router-dom";
const ListenShows = () => {
  const navigate = useNavigate();
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center w-full font-semibold">
        <div className="flex items-center gap-2">
          <MdNavigateBefore
            className="rounded-full bg-black text-2xl md:text-3xl p-1 cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <MdNavigateNext
            className="bg-black text-2xl md:text-3xl p-1 rounded-full cursor-pointer"
            onClick={() => navigate(1)}
          />
        </div>
      </div>

      <h1 className="font-bold text-2xl my-5">
        Stay in the Loop with Top Podcasts!
      </h1>
      <div className="flex overflow-auto">
        {podcastData.map((each, index) => (
          <Podcasts key={index} songDetails={each} />
        ))}
      </div>
    </div>
  );
};

export default ListenShows;
