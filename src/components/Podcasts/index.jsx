// eslint-disable-next-line no-unused-vars
import React, { useContext } from "react";
import { PlayerContext } from "../../context/PlayerContext";

const Podcasts = (props) => {
  // eslint-disable-next-line react/prop-types
  const { songDetails } = props;
  // eslint-disable-next-line react/prop-types
  const { id, image, name, desc } = songDetails;

  const { playWithSongId } = useContext(PlayerContext);

  const handlePlay = () => {
    playWithSongId(id, "podcasts");
  };

  return (
    <div
      className="min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]"
      onClick={handlePlay}
    >
      <img className="rounded" src={image} alt="album" />
      <p className="font-bold mt-2 mb-1">{name}</p>
      <p className="text-slate-200 text-sm">{desc}</p>
    </div>
  );
};

export default Podcasts;
