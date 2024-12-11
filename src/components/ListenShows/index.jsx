// eslint-disable-next-line no-unused-vars
import React from "react";
import Podcasts from "../Podcasts";
import { podcastData } from "../../assets/assets";
import { Link } from "react-router-dom";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";

const ListenShows = () => {
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center w-full font-semibold">
        <div className="flex items-center gap-2">
          <Link to="/">
            <FaRegArrowAltCircleLeft className="text-xl lg:text-2xl" />
          </Link>
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
