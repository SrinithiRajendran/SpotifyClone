import React, { useContext, useEffect } from 'react';
import { PiShuffleBold } from "react-icons/pi";
import { FaCirclePlay, FaCirclePause } from "react-icons/fa6";
import { FaForwardStep, FaBackwardStep } from "react-icons/fa6";
import { SlLoop } from "react-icons/sl";
import { AiOutlinePlaySquare } from "react-icons/ai";
import { LuMic2 } from "react-icons/lu";
import { HiQueueList } from "react-icons/hi2";
import { TbDevices2 } from "react-icons/tb";
import { BiSolidVolumeFull } from "react-icons/bi";
import { CgMiniPlayer } from "react-icons/cg";
import { AiOutlineFullscreen } from "react-icons/ai";
import { PlayerContext } from '../../context/PlayerContext';
import "./index.css"

const MusicPlayer = () => {
    const { playBar, seekBg, play, pause, playStatus, audioRef, musicTrack, playTime, previous, next, seekSong } = useContext(PlayerContext);

    const handleVolumeChange = (e) => {
        audioRef.current.volume = e.target.value;
    };

    // Function to handle the next song when the current song ends
    useEffect(() => {
        const audioElement = audioRef.current;

        if (audioElement) {
            // Listen for the 'ended' event
            audioElement.onended = () => {
                next(); // Call the next function when the song finishes
            };
        }

        // Clean up the event listener on unmount
        return () => {
            if (audioElement) {
                audioElement.onended = null;
            }
        };
    }, [audioRef, next]); // Dependency array ensures this runs when audioRef or next changes

    console.log('Current Music Track:', musicTrack);

    return (
        <div className='text-white px-4 h-[15%] bg-black flex items-center justify-between sticky w-[100%] mb-0'>
            <div className='hidden lg:flex gap-4 items-center musicwidth'>
                <img
                    className='w-12'
                    src={musicTrack.image}
                    alt="song cover"
                    onError={(e) => {
                        e.target.onerror = null; // Prevents looping
                        e.target.src = 'path/to/fallback-image.png'; // Path to fallback image
                    }}
                />
                <div>
                    <p>{musicTrack.name}</p>
                    <p>{musicTrack.desc ? musicTrack.desc.slice(0, 30) : ''}</p>
                </div>
            </div>

            <div className='flex flex-col items-center m-auto gap-1'>
                <div className='flex gap-4 text-2xl cursor-pointer'>
                    <PiShuffleBold className='' />
                    <FaBackwardStep onClick={previous} />
                    {playStatus ? (<FaCirclePause onClick={pause} />) : (<FaCirclePlay onClick={play} />)}
                    <FaForwardStep onClick={next} />
                    <SlLoop />
                </div>
                <div className='flex items-center gap-5'>
                    <p>
                        {(playTime.currentTime.minute < 10 ? '0' : '') + playTime.currentTime.minute}:
                        {(playTime.currentTime.second < 10 ? '0' : '') + playTime.currentTime.second}
                    </p>
                    <div ref={seekBg} onClick={seekSong} className='w-[60vw] max-w-[400px] bg-gray-300 rounded-full cursor-pointer'>
                        <hr ref={playBar} className='bg-green-700 border-none w-10 h-1 rounded-full' />
                    </div>
                    <p>
                        {(playTime.totalTime.minute < 10 ? '0' : '') + playTime.totalTime.minute}:
                        {(playTime.totalTime.second < 10 ? '0' : '') + playTime.totalTime.second}
                    </p>
                </div>
            </div>

            <div className='hidden lg:flex items-center gap-2 opacity-75'>
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
