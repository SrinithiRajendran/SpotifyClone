// eslint-disable-next-line no-unused-vars
import React from "react";
import { useNavigate } from "react-router-dom";

const AlbumItem = (props) => {
  // eslint-disable-next-line react/prop-types
  const { albumDetails } = props;
  // eslint-disable-next-line react/prop-types
  const { id, image, name, desc } = albumDetails;

  const navigate = useNavigate();

  const albumNavigate = () => {
    navigate(`/album/${id}`);
  };
  return (
    <div
      className="min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]"
      onClick={albumNavigate}
    >
      <img className="rounded" src={image} alt="album" />
      <p className="font-bold mt-2 mb-1s">{name}</p>
      <p className="text-slate-200 text-sm">{desc}</p>
    </div>
  );
};

export default AlbumItem;
