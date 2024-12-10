// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect } from "react";
import DisplayNav from "../DisplayNav";
import { PlayerContext } from "../../context/PlayerContext";
import { FcDislike } from "react-icons/fc";

const MyFavourites = () => {
  const {
    favourites,
    playWithFavourites,
    toggleFavourites,
    toggleFavouritesMode,
  } = useContext(PlayerContext);

  useEffect(() => {
    toggleFavouritesMode(true);

    return () => {
      toggleFavouritesMode(false);
    };
  }, [toggleFavouritesMode]);

  return (
    <>
      <DisplayNav />
      <div className="text-white rounded-lg mt-5 mb-10">
        <h2 className="text-1xl md:text-2xl font-bold text-center mb-6">
          My Favourites
        </h2>
        {favourites.length === 0 ? (
          <div className="flex flex-col items-center justify-center">
            <FcDislike className="mb-10 text-4xl" />
            <p className="text-center text-gray-400">No favourite songs yet!</p>
          </div>
        ) : (
          <ul className="space-y-4">
            {favourites.map((song) => (
              <li
                key={song.favouriteId}
                className="flex items-center justify-between p-4 bg-[#000000] rounded-lg cursor-pointer transition-all hover:bg-[#1c1c1c]"
                onClick={() => playWithFavourites(song.favouriteId)}
                role="button"
                aria-label={`Play ${song.title}`}
              >
                <div className="w-16 h-16 rounded-lg overflow-hidden mr-4">
                  <img
                    className="object-cover w-full h-full"
                    src={song.image}
                    alt={`Cover of ${song.title}`}
                  />
                </div>

                <div className="flex-grow">
                  <h3 className="text-lg font-semibold">{song.title}</h3>
                  <p className="text-sm text-gray-400">{song.desc}</p>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavourites(song, song.artistId);
                  }}
                  className="text-gray-400 hover:text-black"
                  aria-label={`Remove ${song.title} from favourites`}
                >
                  <FcDislike className="text-lg" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default MyFavourites;
