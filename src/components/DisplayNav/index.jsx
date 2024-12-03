// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { GrInstallOption } from "react-icons/gr";
import { useNavigate, Link } from "react-router-dom";
import "./index.css";

// eslint-disable-next-line react/prop-types
const DisplayNav = ({ onTabChange }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("All");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    onTabChange(tab);
  };

  return (
    <>
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
        <div className="hide-nav items-center gap-2 sm:gap-3 md:gap-4">
          <Link to="/explore-premium">
            <button className="bg-white rounded-2xl text-gray-900 text-[12px] sm:text-[13px] md:text-[15px] px-3 sm:px-4 py-1 cursor-pointer">
              Explore Premium
            </button>
          </Link>
          <div className="flex items-center hide-on-small">
            <GrInstallOption className="text-[12px] sm:text-[13px] md:text-[15px]" />
            <button className="bg-transparent py-1 px-2 sm:px-3 text-[10px] sm:text-[12px] md:text-[14px] lg:text-[15px] cursor-pointer">
              Install App
            </button>
          </div>

          <p className="bg-blue-500 text-black w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center text-[12px] sm:text-[14px] md:text-[15px]">
            S
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3 md:gap-4 mt-4 cursor-pointer">
        <p
          className={`px-3 sm:px-4 py-1 text-[12px] sm:text-[13px] md:text-[15px] rounded-2xl ${
            activeTab === "All" ? "bg-white text-black" : "bg-black text-white"
          }`}
          onClick={() => handleTabClick("All")}
        >
          All
        </p>
        <p
          className={`px-3 sm:px-4 py-1 text-[12px] sm:text-[13px] md:text-[15px] rounded-2xl ${
            activeTab === "Music"
              ? "bg-white text-black"
              : "bg-black text-white"
          }`}
          onClick={() => handleTabClick("Music")}
        >
          Music
        </p>
        <p
          className={`px-3 sm:px-4 py-1 text-[12px] sm:text-[13px] md:text-[15px] rounded-2xl ${
            activeTab === "Podcasts"
              ? "bg-white text-black"
              : "bg-black text-white"
          }`}
          onClick={() => handleTabClick("Podcasts")}
        >
          Podcasts
        </p>
      </div>
    </>
  );
};

export default DisplayNav;
