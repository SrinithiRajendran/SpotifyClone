// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect } from "react";
import { PiShuffleBold } from "react-icons/pi";
import { FaCirclePlay, FaCirclePause } from "react-icons/fa6";
import { FaForwardStep, FaBackwardStep } from "react-icons/fa6";
import { SlLoop } from "react-icons/sl";
import { AiOutlinePlaySquare } from "react-icons/ai";
import { LuMic2 } from "react-icons/lu";
import { HiQueueList } from "react-icons/hi2";
import { TbDevices2 } from "react-icons/tb";
import { FaSpotify } from "react-icons/fa";
import { BiSolidVolumeFull } from "react-icons/bi";
import { CgMiniPlayer } from "react-icons/cg";
import { AiOutlineFullscreen } from "react-icons/ai";
import { PlayerContext } from "../../context/PlayerContext";
import "./index.css";

const MusicPlayer = () => {
  const {
    playBar,
    seekBg,
    play,
    pause,
    playStatus,
    audioRef,
    musicTrack,
    playTime,
    previous,
    next,
    seekSong,
    toggleLoop,
    isLooping,
    favouriteTrack,
    playWithFavourites, // Assuming playWithFavourites is part of context
  } = useContext(PlayerContext);

  const handleVolumeChange = (e) => {
    audioRef.current.volume = e.target.value;
  };

  useEffect(() => {
    const audioElement = audioRef.current;
    const handleEnded = () => {
      next();
    };
    if (audioElement) {
      audioElement.addEventListener("ended", handleEnded);
    }
    return () => {
      if (audioElement) {
        audioElement.removeEventListener("ended", handleEnded);
      }
    };
  }, [audioRef, next]);

  const handleFavouriteTrackClick = () => {
    if (favouriteTrack) {
      playWithFavourites(favouriteTrack.favouriteId);
    }
  };

  console.log("Current Music Track:", musicTrack);
  console.log("Favourite Track:", favouriteTrack);
  const currentTrack = musicTrack || favouriteTrack;

  return (
    <div className="text-white  px-4 pr-2 sm:h-[15%] md:h-[25%] lg:h-[15%] bg-black flex items-center justify-between sticky w-[100%] mb-0">
      {currentTrack && (
        <div
          className="hidden lg:flex gap-4 items-center musicwidth"
          onClick={
            currentTrack === favouriteTrack ? handleFavouriteTrackClick : null
          }
        >
          <img
            className="w-12"
            src={currentTrack?.image}
            alt={currentTrack?.name}
          />
          {!currentTrack?.image && (
            <div className="flex items-center ">
              <FaSpotify className="mr-2" /> SPOTIFY
            </div>
          )}
          <div className="  text-[#74e474]  hover:text-[white]">
            <p>{currentTrack.name}</p>
            <p>{currentTrack.desc ? currentTrack.desc.slice(0, 30) : ""}</p>
          </div>
        </div>
      )}

      <div className="flex flex-col items-center justify-center mx-auto mt-10 md:mt-0 gap-1 ">
        <div className="flex gap-4 text-xl md:text-2xl cursor-pointer items-center ">
          {currentTrack && (
            <div
              className="flex lg:hidden items-center"
              onClick={
                currentTrack === favouriteTrack
                  ? handleFavouriteTrackClick
                  : null
              }
            >
              <img
                className="w-8 sm:w-12 mr-1 rounded-md"
                src={currentTrack?.image}
                alt={currentTrack?.name}
              />
              {!currentTrack?.image && (
                <div className="flex items-center text-xl text-[#3c863c]">
                  <FaSpotify />
                </div>
              )}
            </div>
          )}

          <PiShuffleBold className="" />
          <FaBackwardStep onClick={previous} />
          {playStatus ? (
            <FaCirclePause onClick={pause} className="hover:text-[#4fb34f]" />
          ) : (
            <FaCirclePlay onClick={play} className="hover:text-[#479b47]" />
          )}
          <FaForwardStep onClick={next} />
          <SlLoop
            onClick={toggleLoop}
            className=""
            style={{ color: isLooping ? "green" : "white" }}
          />

          {currentTrack && (
            <div
              className="flex lg:hidden items-center "
              onClick={
                currentTrack === favouriteTrack
                  ? handleFavouriteTrackClick
                  : null
              }
            >
              <div className="ml-1 text-xs text-[#55ba55] hover:text-[white]">
                <p>{currentTrack.name}...</p>
                <p>{currentTrack.desc ? currentTrack.desc.slice(0, 30) : ""}</p>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-5 mt-1 sm:mt-0 text-xs sm:text-lg ">
          <p>
            {(playTime.currentTime.minute < 10 ? "0" : "") +
              playTime.currentTime.minute}
            :
            {(playTime.currentTime.second < 10 ? "0" : "") +
              playTime.currentTime.second}
          </p>

          <div
            ref={seekBg}
            onClick={seekSong}
            className="w-[60vw] max-w-[400px] bg-gray-300 rounded-full cursor-pointer"
          >
            <hr
              ref={playBar}
              className="bg-green-700 border-none w-10 h-1 rounded-full"
            />
          </div>

          <p>
            {(playTime.totalTime.minute < 10 ? "0" : "") +
              playTime.totalTime.minute}
            :
            {(playTime.totalTime.second < 10 ? "0" : "") +
              playTime.totalTime.second}
          </p>
        </div>
      </div>

      <div className="hidden lg:flex items-center gap-2 opacity-75">
        <AiOutlinePlaySquare />
        <LuMic2 />
        <HiQueueList />
        <TbDevices2 />
        <BiSolidVolumeFull />
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          defaultValue="0.5"
          onChange={handleVolumeChange}
          className="w-[100px] h-1 bg-white rounded-lg appearance-none cursor-pointer outline-none border-none hover:bg-green-500"
        />
        <CgMiniPlayer />
        <AiOutlineFullscreen />
      </div>
    </div>
  );
};

export default MusicPlayer;
