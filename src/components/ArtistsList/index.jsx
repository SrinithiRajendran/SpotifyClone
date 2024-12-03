// eslint-disable-next-line no-unused-vars
import React from "react";
import { useNavigate } from "react-router-dom";

const ArtistsList = (props) => {
  // eslint-disable-next-line react/prop-types
  const { artistsDetails } = props;
  // eslint-disable-next-line react/prop-types
  const { id, image, name, desc } = artistsDetails;

  const navigate = useNavigate();

  const albumNavigate = () => {
    navigate(`/artists/${id}`);
  };
  return (
    <div
      className="min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]"
      onClick={albumNavigate}
    >
      <img className="rounded-full" src={image} alt="album" />
      <p className="font-bold mt-2 mb-1s">{name}</p>
      <p className="text-slate-200 text-sm">{desc}</p>
    </div>
  );
};

export default ArtistsList;
