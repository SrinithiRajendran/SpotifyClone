// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import { useRef } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import DisplayHome from "../DisplayHome";
import AlbumsList from "../AlbumsList";
import { albumsData } from "../../assets/assets";
import ExplorePremium from "../ExplorePremium";
import Throwback from "../Throwback";
import Artists from "../Artists";
import ListenShows from "../ListenShows";

const DisplayMusic = () => {
  const displayRef = useRef();
  const location = useLocation();
  const isAlbum =
    location.pathname.includes("album") ||
    location.pathname.includes("throwback");
  const albumId = isAlbum ? location.pathname.slice(-1) : "";
  const bgColor = albumsData[Number(albumId)].bgColor;

  useEffect(() => {
    if (isAlbum) {
      displayRef.current.style.background = `linear-gradient(${bgColor},#121212)`;
    } else {
      displayRef.current.style.background = `#121212`;
    }
  });

  return (
    <div
      className="text-white overflow-auto w-[100%] m-2 px-6 pt-4 lg:w-[75%] lg:ml-0 rounded bg-[#121212]"
      ref={displayRef}
    >
      <Routes>
        <Route path="/" element={<DisplayHome />} />
        <Route path="/album/:id" element={<AlbumsList />} />
        <Route path="/explore-premium" element={<ExplorePremium />} />
        <Route path="/throwback/:id" element={<Throwback />} />
        <Route path="/artists/:id" element={<Artists />} />
        <Route path="/listenshows" element={<ListenShows />} />
      </Routes>
    </div>
  );
};

export default DisplayMusic;
