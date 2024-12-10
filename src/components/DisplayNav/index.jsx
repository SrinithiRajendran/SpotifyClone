// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { GrInstallOption } from "react-icons/gr";
import { useNavigate, Link } from "react-router-dom";
import { BsStack } from "react-icons/bs";
import { FaArrowRight, FaPlus, FaBars } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import "./index.css";

// eslint-disable-next-line react/prop-types
const DisplayNav = ({ onTabChange }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("All");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    onTabChange(tab);
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to toggle the menu state
  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
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
      <div className="flex items-center justify-between mt-4 mb-8">
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4 mt-4 cursor-pointer">
          <p
            className={`px-3 sm:px-4 py-1 text-[12px] sm:text-[13px] md:text-[15px] rounded-2xl ${
              activeTab === "All"
                ? "bg-white text-black"
                : "bg-black text-white"
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

        <button
          onClick={toggleMenu}
          className="text-[white] hover:text-[#52cd4e]"
        >
          {isMenuOpen ? (
            <IoClose className=" flex lg:hidden text-3xl md:text-4xl" />
          ) : (
            <FaBars className=" flex lg:hidden text-2xl md:text-3xl" />
          )}
        </button>
      </div>

      <div
        className={`w-[100%] p-2 flex-col gap-2 text-[white] flex lg:hidden ${
          isMenuOpen ? "block" : "hidden"
        } lg:flex`} // The content is visible when isMenuOpen is true
      >
        <div className="bg-[#121212] h-[85%] rounded">
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BsStack />
              <p className="font-semibold">Your Library</p>
            </div>
            <div className="flex items-center gap-3">
              <FaArrowRight />
              <FaPlus />
            </div>
          </div>
          <div className="p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4">
            <h1 className="font-bold">
              Every &apos;like&apos; is a memory, enjoy them all
            </h1>
            <p className="font-light">Cherish your favorites</p>
            <Link to="/fav">
              <button className="px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4">
                Fav Tunes
              </button>
            </Link>
          </div>
          <div className="p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4">
            <h1 className="font-bold">Explore Fresh Voices in Podcasting!</h1>
            <p className="font-light">Stay Tuned for the Latest Episodes!</p>

            <Link to="listenshows">
              <button className="px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4">
                Listen Shows
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default DisplayNav;
