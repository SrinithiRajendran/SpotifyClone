/* eslint-disable react/prop-types */
import { createContext, useEffect, useRef, useState } from "react";
import {
  albumsData,
  artistsData,
  trendinghits,
  throwbackData,
  podcastData,
} from "../assets/assets";

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
  const audioRef = useRef(new Audio());
  const seekBg = useRef();
  const playBar = useRef();
  const [musicTrack, setMusicTrack] = useState({
    name: "",
    desc: "",
    image: "",
  });

  const [favouriteTrack, setFavouriteTrack] = useState({
    name: "",
    desc: "",
    image: "",
  });

  const [playStatus, setPlayStatus] = useState(false);
  const [playTime, setPlayTime] = useState({
    currentTime: { second: 0, minute: 0 },
    totalTime: { second: 0, minute: 0 },
  });

  const [trackList, setTrackList] = useState([0]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [artistAlbum, setArtistAlbum] = useState(null);
  const [isLooping, setIsLooping] = useState(false);
  const [activeSong, setActiveSong] = useState({
    songId: null,
    source: null,
    artistId: null,
  });
  const [activeFavSong, setActiveFavSong] = useState({
    favouriteId: null,
  });

  const [favourites, setFavourites] = useState(() => {
    const storedFavourites = localStorage.getItem("favourites");
    return storedFavourites ? JSON.parse(storedFavourites) : [];
  });

  useEffect(() => {
    // Update localStorage whenever favourites change
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  const toggleFavourites = (song, artistId) => {
    setFavourites((prevFavourites) => {
      console.log("Current Favourites:", prevFavourites);

      //to check if the song is already in favourites
      const isFavourite = (favSong) =>
        favSong.artistId === artistId &&
        favSong.source === song.source &&
        favSong.title === song.title &&
        favSong.file === song.file;

      // Check if the song is already a favourite
      const isSongAlreadyFavourite = prevFavourites.some(isFavourite);

      if (isSongAlreadyFavourite) {
        // If the song is already a favourite, remove it
        console.log(`Removing song: ${song.title} from favourites.`);
        return prevFavourites.filter((favSong) => !isFavourite(favSong));
      } else {
        // If the song is not a favourite, add it with unique favouriteId
        console.log(`Adding song: ${song.title} to favourites.`);

        // Add the song to favourites with a new favouriteId
        const newFavourite = {
          ...song,
          artistId,
          favouriteId: prevFavourites.length, //next available unique favouriteId
        };

        // Create a new array with the updated favourites
        const newFavourites = [...prevFavourites, newFavourite];

        return newFavourites;
      }
    });
  };

  const playWithFavourites = async (favouriteId) => {
    try {
      console.log("playWithFavourites called with:", favouriteId);

      // Find the song in the favourites array
      const favouriteSong = favourites.find(
        (song) => song.favouriteId === favouriteId
      );

      if (!favouriteSong) {
        console.error("Favourite track not found for ID:", favouriteId);
        return;
      }
      setActiveFavSong({ favouriteId });
      console.log("Playing favourite song:", favouriteSong);
      handleTrackPlayback(favouriteSong);

      // Set the favourite track details
      setFavouriteTrack({
        name: favouriteSong.title,
        desc: favouriteSong.desc,
        image: favouriteSong.image,
      });

      const playAudio = async () => {
        try {
          if (audioRef.current.readyState >= 2) {
            audioRef.current.currentTime = 0; // Reset for a new track
            await audioRef.current.play();
            setPlayStatus(true);
          } else {
            const handleCanPlay = async () => {
              try {
                audioRef.current.removeEventListener("canplay", handleCanPlay);
                await audioRef.current.play();
                setPlayStatus(true);
              } catch (error) {
                console.error("Error during playback:", error);
              }
            };

            audioRef.current.addEventListener("canplay", handleCanPlay);
          }
        } catch (error) {
          console.error("Error during playback:", error);
        }
      };

      playAudio();
    } catch (error) {
      console.error("Error handling favourite track playback:", error);
    }
  };
  const handleTrackPlayback = async (track) => {
    try {
      if (!track || !track.file) {
        console.error("Invalid track or audio file:", track);
        return;
      }

      // Set the music track details
      const trackDetails = {
        name: track.title,
        desc: track.desc,
        image: track.image,
      };
      setMusicTrack(trackDetails); // Send track info to the music player

      // Set the audio source to the track's audio file
      if (audioRef.current && audioRef.current.src !== track.file) {
        audioRef.current.src = track.file;
      }

      // Play the audio with the common playback logic
      const playAudio = async () => {
        try {
          if (audioRef.current.readyState >= 2) {
            audioRef.current.currentTime = 0; // Reset for a new track
            await audioRef.current.play();
            setPlayStatus(true);
          } else {
            const handleCanPlay = async () => {
              try {
                audioRef.current.removeEventListener("canplay", handleCanPlay);
                await audioRef.current.play();
                setPlayStatus(true);
              } catch (error) {
                console.error("Error during playback:", error);
              }
            };

            audioRef.current.addEventListener("canplay", handleCanPlay);
          }
        } catch (error) {
          console.error("Error during playback:", error);
        }
      };

      playAudio();
    } catch (error) {
      console.error("Error in handling track playback:", error);
    }
  };
  const playWithSongId = async (id, source, artistId) => {
    try {
      console.log("playWithSongId called with:", { id, source, artistId });
      let track;
      switch (source) {
        case "artists": {
          const artist = artistsData.find((artist) => artist.id === artistId);
          if (artist) {
            track = artist.songs.find((song) => song.id === id);
            if (track) {
              setTrackList(artist.songs);
              setArtistAlbum(artist);
              setCurrentTrackIndex(
                artist.songs.findIndex((song) => song.id === id)
              );
              setActiveSong({ songId: id, source, artistId });
            } else {
              console.error(
                "Track not found for artist ID:",
                artistId,
                "and song ID:",
                id
              );
              return;
            }
          } else {
            console.error(`Artist not found for ID: ${artistId}`);
            return;
          }
          break;
        }
        case "albums": {
          const album = albumsData.find((album) => album.id === artistId);
          if (!album) {
            console.error(`Album not found for ID: ${artistId}`);
            return;
          }
          track = album.songs.find((song) => song.id === id);

          if (track) {
            setTrackList(album.songs);
            setArtistAlbum(album);
            setCurrentTrackIndex(
              album.songs.findIndex((song) => song.id === id)
            );
            setActiveSong({ songId: id, source, artistId });
          } else {
            console.error(
              "Track not found for album artist ID:",
              artistId,
              "and song ID:",
              id
            );
            return;
          }
          break;
        }
        case "throwback": {
          const throwbackArtist = throwbackData.find(
            (item) => item.id === artistId
          );
          if (!throwbackArtist) {
            console.error(`Throwback not found for ID: ${artistId}`);
            return;
          }

          track = throwbackArtist.songs.find((song) => song.id === id);
          if (track) {
            setTrackList(throwbackArtist.songs);
            setArtistAlbum(throwbackArtist);
            setCurrentTrackIndex(
              throwbackArtist.songs.findIndex((song) => song.id === id)
            );
            setActiveSong({ songId: id, source, artistId });
          } else {
            console.error(
              "Track not found for throwback artist ID:",
              artistId,
              "and song ID:",
              id
            );
            return;
          }
          break;
        }
        case "trending": {
          track = trendinghits.find((song) => song.id === id);
          if (track) {
            setTrackList(trendinghits);
            setArtistAlbum(null);
            setCurrentTrackIndex(
              trendinghits.findIndex((song) => song.id === id)
            );
          } else {
            console.error("Track not found for trending ID:", id);
            return;
          }
          break;
        }
        case "podcasts": {
          track = podcastData.find((song) => song.id === id);
          if (track) {
            setTrackList(podcastData);
            setArtistAlbum(null);
            setCurrentTrackIndex(
              podcastData.findIndex((song) => song.id === id)
            );
          } else {
            console.error("Track not found for podcast ID:", id);
            return;
          }
          break;
        }
        default:
          console.error(`Unknown source: ${source}`);
          return;
      }

      if (track) {
        const audioFile = track.file;
        console.log(`Playing song:`, track);
        if (!audioFile) {
          console.error("Invalid audio file for track:", track.title);
          return;
        }
        handleTrackPlayback(track);
      } else {
        console.error("Track not found for ID:", id);
      }
    } catch (error) {
      console.error("Error handling track playback:", error);
    }
  };

  const toggleLoop = () => {
    setIsLooping(!isLooping);
  };
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = isLooping;
    }
  }, [isLooping]);

  const play = async () => {
    try {
      if (audioRef.current.readyState >= 2) {
        await audioRef.current.play();
        setPlayStatus(true);
      } else {
        console.error("Audio is not ready for playback.");
      }
    } catch (error) {
      console.error("Play failed:", error);
    }
  };

  const pause = () => {
    audioRef.current.pause();
    setPlayStatus(false);
  };

  // State to track if you're in favourites or normal track list like albums,artists
  const [isInFavourites, setIsInFavourites] = useState(false);

  const next = () => {
    if (isInFavourites && favourites.length > 0) {
      console.log("Active Song Favourite ID:", activeFavSong.favouriteId);

      // Log favouriteIds for each song in the favourites array
      favourites.forEach((song, index) => {
        console.log(
          `Song at index ${index}: favouriteId = ${song.favouriteId}`
        );
      });

      // Ensure activeSong has a valid favouriteId
      if (
        typeof activeFavSong.favouriteId === "undefined" ||
        activeFavSong.favouriteId === null
      ) {
        console.error("Active song does not have a favouriteId.");
        return;
      }

      const currentFavouriteIndex = favourites.findIndex(
        (song) => song.favouriteId === Number(activeFavSong.favouriteId)
      );

      if (currentFavouriteIndex !== -1) {
        const nextFavouriteIndex =
          (currentFavouriteIndex + 1) % favourites.length;
        const nextFavouriteSong = favourites[nextFavouriteIndex];

        if (nextFavouriteSong) {
          setActiveSong({
            favouriteId: nextFavouriteSong.favouriteId,
          });

          // Play the next favourite song
          playWithFavourites(nextFavouriteSong.favouriteId);
          console.log(
            "Playing next favourite song:",
            nextFavouriteSong.favouriteId
          );
        }
      } else {
        console.error("Current Favourite Index not found!");
      }
    } else if (trackList && trackList.length > 0) {
      // Navigate in the regular track list
      const nextIndex = (currentTrackIndex + 1) % trackList.length;
      const nextTrack = trackList[nextIndex];

      console.log("Next Track:", nextTrack);

      if (nextTrack) {
        const source =
          nextTrack.source || (nextTrack.artistId ? "artists" : "favourites");
        const artistId = nextTrack.artistId || activeSong.artistId;

        // Play the next track
        playWithSongId(nextTrack.id, source, artistId);
        setCurrentTrackIndex(nextIndex);
      }
    } else {
      console.warn("No tracks available to navigate.");
    }
  };

  const previous = () => {
    if (isInFavourites && favourites.length > 0) {
      console.log("Active Song Favourite ID:", activeFavSong.favouriteId);

      favourites.forEach((song, index) => {
        console.log(
          `Song at index ${index}: favouriteId = ${song.favouriteId}`
        );
      });

      if (
        typeof activeFavSong.favouriteId === "undefined" ||
        activeFavSong.favouriteId === null
      ) {
        console.error("Active song does not have a favouriteId.");
        return;
      }

      const currentFavouriteIndex = favourites.findIndex(
        (song) => song.favouriteId === Number(activeFavSong.favouriteId)
      );

      if (currentFavouriteIndex !== -1) {
        const prevFavouriteIndex =
          (currentFavouriteIndex - 1 + favourites.length) % favourites.length;
        const prevFavouriteSong = favourites[prevFavouriteIndex];

        if (prevFavouriteSong) {
          setActiveFavSong({
            favouriteId: prevFavouriteSong.favouriteId,
          });

          playWithFavourites(prevFavouriteSong.favouriteId);
          console.log(
            "Playing previous favourite song:",
            prevFavouriteSong.favouriteId
          );
        }
      } else {
        console.error("Current Favourite Index not found!");
      }
    } else if (trackList && trackList.length > 0) {
      const prevIndex =
        (currentTrackIndex - 1 + trackList.length) % trackList.length;
      const prevTrack = trackList[prevIndex];

      console.log("Previous Track:", prevTrack);

      if (prevTrack) {
        const source =
          prevTrack.source || (prevTrack.artistId ? "artists" : "favourites");
        const artistId = prevTrack.artistId || activeSong.artistId;

        // Play the previous track
        playWithSongId(prevTrack.id, source, artistId);
        setCurrentTrackIndex(prevIndex);
      }
    } else {
      console.warn("No tracks available to navigate.");
    }
  };

  // Function to handle when entering or leaving favourites
  const toggleFavouritesMode = (isFavouritesMode) => {
    setIsInFavourites(isFavouritesMode);
  };

  const seekSong = (e) => {
    if (audioRef.current.duration) {
      audioRef.current.currentTime =
        (e.nativeEvent.offsetX / seekBg.current.offsetWidth) *
        audioRef.current.duration;
    }
  };

  useEffect(() => {
    const updatePlayTime = () => {
      if (audioRef.current.duration) {
        playBar.current.style.width =
          Math.floor(
            (audioRef.current.currentTime / audioRef.current.duration) * 100
          ) + "%";
        setPlayTime({
          currentTime: {
            second: Math.floor(audioRef.current.currentTime % 60),
            minute: Math.floor(audioRef.current.currentTime / 60),
          },
          totalTime: {
            second: Math.floor(audioRef.current.duration % 60),
            minute: Math.floor(audioRef.current.duration / 60),
          },
        });
      }
    };

    audioRef.current.addEventListener("timeupdate", updatePlayTime);

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      audioRef.current.removeEventListener("timeupdate", updatePlayTime);
    };
  }, []);

  const contextValue = {
    audioRef,
    playBar,
    seekBg,
    musicTrack,
    setMusicTrack,
    playStatus,
    setPlayStatus,
    playTime,
    setPlayTime,
    play,
    pause,
    playWithSongId,
    next,
    previous,
    seekSong,
    artistAlbum,
    toggleLoop,
    isLooping,
    setCurrentTrackIndex,
    currentTrackIndex,
    activeSong,
    toggleFavourites,
    favourites,
    playWithFavourites,
    setFavouriteTrack,
    favouriteTrack,
    toggleFavouritesMode,
    setIsInFavourites,
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  );
};
export default PlayerContextProvider;
