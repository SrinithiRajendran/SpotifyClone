// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect } from "react";
import { MdNavigateBefore } from "react-icons/md";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { albumsData, assets } from "../../assets/assets";
import { PlayerContext } from "../../context/PlayerContext";
import { FaRegHeart } from "react-icons/fa";
import { FcLike } from "react-icons/fc";

const AlbumsList = () => {
  const { id } = useParams();
  const albumId = parseInt(id, 10);

  const albumData = albumsData.find((album) => album.id === albumId);

  const { playWithSongId, activeSong, favourites, toggleFavourites } =
    useContext(PlayerContext);

  useEffect(() => {
    if (albumData) {
      console.log("selected Album:", albumData.name);
      albumData.songs.forEach((song) => {
        console.log("Song File:", song.file);
      });
    }
  }, [albumData]);

  if (!albumData) {
    return <p>Album not found</p>;
  }

  const handlePlaySong = (e, songId) => {
    e.stopPropagation();
    playWithSongId(songId, "albums", albumId);
  };

  const handleToggleFavourite = (song) => {
    const source = "albums"; // specify source as "artists" for this context
    const artistId = albumId; // Add artistId to differentiate between songs from different artists
    toggleFavourites(song, artistId, source); // Pass song, artistId, and source to the toggleFavourites function
  };

  return (
    <>
      <Link to="/">
        <MdNavigateBefore className="text-xl lg:text-2xl" />
      </Link>
      <div className="flex flex-col md:flex-row md:items-end gap-8 mt-10">
        <img src={albumData.image} alt="album cover" className="w-48 rounded" />
        <div className="flex flex-col">
          <p>Album Playlist</p>
          <h2 className="font-bold mb-4 md:text-7xl text-5xl">
            {albumData.name}
          </h2>
          <h4>{albumData.desc}</h4>
        </div>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 mt-12 mb-4 pl-2 text-[#a7a7a7]">
        <div className="flex">
          <b className="mr-4">#</b>
          <p>Title</p>
        </div>
        <p className="ml-2 ">Album</p>
        <p className="hidden sm:block ">Date Added</p>
        <img className="m-auto w-4" src={assets.clock_icon} alt="duration" />
      </div>
      <hr />

      {albumData.songs && albumData.songs.length > 0 ? (
        albumData.songs.map((song) => {
          const isActive =
            activeSong?.songId === song.id &&
            activeSong?.artistId === albumId &&
            activeSong?.source === "albums";

          const isFavourite = favourites.some(
            (favSong) =>
              favSong.id === song.id &&
              favSong.artistId === albumId && // Include artistId in the comparison
              favSong.source === "albums"
          );

          return (
            <div
              key={song.id}
              className={`grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer pb-5 ${
                isActive ? "bg-[#000000]" : ""
              }`}
              onClick={(e) => handlePlaySong(e, song.id)} // Pass event object to stop propagation
            >
              <div className="text-white flex">
                <button
                  className="mr-4 text-[#a7a7a7]"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent song from playing when toggling fav
                    handleToggleFavourite(song);
                  }}
                >
                  {isFavourite ? (
                    <FcLike /> // Heart for favourited songs
                  ) : (
                    <FaRegHeart /> // Empty heart for non-favourite songs
                  )}
                </button>
                <p className="truncate">{song.title}</p>
              </div>

              <p className="ml-2 text-[12px] sm:text-[15px]">
                {albumData.name}
              </p>
              <p className="hidden sm:block text-[12px] sm:text-[15px]">
                {song.dateAdded}
              </p>
              <p className="text-center text-[12px] sm:text-[15px]">
                {song.duration}
              </p>
            </div>
          );
        })
      ) : (
        <p>No songs available</p>
      )}
    </>
  );
};

export default AlbumsList;
