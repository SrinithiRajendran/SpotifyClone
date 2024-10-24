import { createContext, useEffect, useRef, useState } from "react";
import { albumsData, artistsData, trendinghits, throwbackData, podcastData } from "../assets/assets";

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
    const audioRef = useRef(new Audio());
    const seekBg = useRef();
    const playBar = useRef();
    const [musicTrack, setMusicTrack] = useState(podcastData[0]);
    const [playStatus, setPlayStatus] = useState(false);
    const [playTime, setPlayTime] = useState({
        currentTime: { second: 0, minute: 0 },
        totalTime: { second: 0, minute: 0 },
    });
    const [trackList, setTrackList] = useState([]);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [artistAlbum, setArtistAlbum] = useState(null); 
    const [throwbackAlbum, setThrowbackAlbum] = useState(null); 
    const [albumData, setAlbumData] = useState(null);

    const play = () => {
        if (audioRef.current.src) {
            audioRef.current.play()
                .then(() => {
                    setPlayStatus(true);
                })
                .catch(error => {
                    console.error("Error playing audio:", error);
                });
        } else {
            console.error("No audio source set.");
        }
    };

    const pause = () => {
        audioRef.current.pause();
        setPlayStatus(false);
    };

    const playWithSongId = async (id, source, artistId) => {
        try {
            console.log("playWithSongId called with:", { id, source, artistId });

            let track;
            switch (source) {
                case 'artists':
                    const artist = artistsData.find(artist => artist.id === artistId);
                    if (artist) {
                        track = artist.songs.find(song => song.id === id);
                        if (track) {
                            setTrackList(artist.songs);
                            setArtistAlbum(artist); 
                        } else {
                            console.error("Track not found for artist ID:", artistId, "and song ID:", id);
                            return;
                        }
                    } else {
                        console.error(`Artist not found for ID: ${artistId}`);
                        return;
                    }
                    break;

                case 'albums':
                    const album = albumsData.find(album => album.id === artistId);
                    if (!album) {
                        console.error(`Album not found for ID: ${artistId}`);
                        return;
                    }
                    track = album.songs.find(song => song.id === id);

                    if (track) {
                        setTrackList(album.songs);
                        setArtistAlbum(album); 
                        setAlbumData(album);
                    } else {
                        console.error("Track not found for album artist ID:", artistId, "and song ID:", id);
                        return; 
                    }
                    break;

                case 'throwback':
                    const throwbackArtist = throwbackData.find(item => item.id === artistId);
                    if (!throwbackArtist) {
                        console.error(`Throwback not found for ID: ${artistId}`);
                        return; 
                    }

                    track = throwbackArtist.songs.find(song => song.id === id);
                    if (track) {
                        setTrackList(throwbackArtist.songs);
                        setArtistAlbum(throwbackArtist); 
                    } else {
                        console.error("Track not found for throwback artist ID:", artistId, "and song ID:", id);
                        return; 
                    }
                    break;

                case 'trending':
                    track = trendinghits.find(song => song.id === id);
                    if (track) {
                        setTrackList(trendinghits); 
                        setArtistAlbum(null); 
                        setCurrentTrackIndex(trendinghits.findIndex(song => song.id === id)); 
                    } else {
                        console.error("Track not found for trending ID:", id);
                        return;
                    }
                    break;

                case 'podcasts':
                    track = podcastData.find(song => song.id === id);
                    if (track) {
                        setTrackList(podcastData); 
                        setArtistAlbum(null); 
                        setCurrentTrackIndex(podcastData.findIndex(song => song.id === id)); 
                    } else {
                        console.error("Track not found for podcast ID:", id);
                        return;
                    }
                    break;

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

                audioRef.current.src = audioFile;
                setMusicTrack({
                    name: track.title,
                    desc: track.desc,
                    image: track.image,
                });

                if (!audioRef.current.paused) {
                    audioRef.current.pause();
                    setPlayStatus(false);
                }

                await audioRef.current.load();

                const handleCanPlayThrough = async () => {
                    try {
                        audioRef.current.removeEventListener('canplaythrough', handleCanPlayThrough);
                        await audioRef.current.play();
                        setPlayStatus(true);
                        setCurrentTrackIndex(trackList.findIndex(song => song.id === id));
                    } catch (error) {
                        console.error("Error playing audio:", error);
                    }
                };

                audioRef.current.addEventListener('canplaythrough', handleCanPlayThrough);

                if (audioRef.current.readyState >= 2) {
                    handleCanPlayThrough();
                }

            } else {
                console.error("Track not found for ID:", id);
            }

        } catch (error) {
            console.error("Error playing audio:", error);
        }
    };

    const next = () => {
        if (trackList.length > 0) {
            const nextIndex = (currentTrackIndex + 1) % trackList.length;
            const nextTrack = trackList[nextIndex];
            setCurrentTrackIndex(nextIndex);

            if (nextTrack) {
                const source = nextTrack.source || (nextTrack.artistId ? 'artists' : 'trending');
                const artistId = nextTrack.artistId || artistAlbum?.id;

                playWithSongId(nextTrack.id, source, artistId);
            } else {
                console.error("Next track is undefined.");
            }
        } else {
            console.error("Track list is empty.");
        }
    };
    
    
    const previous = () => {
        if (trackList.length > 0) {
            const prevIndex = (currentTrackIndex - 1 + trackList.length) % trackList.length;
            const prevTrack = trackList[prevIndex];
            setCurrentTrackIndex(prevIndex);

            if (prevTrack) {
                const source = prevTrack.source || (prevTrack.artistId ? 'artists' : 'trending');
                const artistId = prevTrack.artistId || artistAlbum?.id;

                playWithSongId(prevTrack.id, source, artistId);
            } else {
                console.error("Previous track is undefined.");
            }
        } else {
            console.error("Track list is empty.");
        }
    };
    
    const seekSong = (e) => {
        if (audioRef.current.duration) {
            audioRef.current.currentTime = ((e.nativeEvent.offsetX / seekBg.current.offsetWidth) * audioRef.current.duration);
        }
    };

    useEffect(() => {
        const updatePlayTime = () => {
            if (audioRef.current.duration) {
                playBar.current.style.width = (Math.floor(audioRef.current.currentTime / audioRef.current.duration * 100)) + "%";
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
    };

    return (
        <PlayerContext.Provider value={contextValue}>
            {props.children}
        </PlayerContext.Provider>
    );
};

export default PlayerContextProvider;


