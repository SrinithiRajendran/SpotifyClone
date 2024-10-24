import React, { useContext, useEffect } from 'react';
import DisplayNav from '../DisplayNav';
import { useParams } from 'react-router-dom';
import { throwbackData, assets } from '../../assets/assets'; // Ensure correct path to assets
import { PlayerContext } from '../../context/PlayerContext';

const Throwback = () => {
    const { id } = useParams();  // Use id from the route params
    const albumId = parseInt(id, 10);  // Ensure id is a number
    
    // Find the throwback album based on the albumId
    const throwbackAlbum = throwbackData.find(album => album.id === albumId);
    const { playWithSongId } = useContext(PlayerContext);

    // Log the selected album only when `throwbackAlbum` changes
    useEffect(() => {
        if (throwbackAlbum) {
            console.log('Selected Album:', throwbackAlbum.name);
            // Log each song file once
            throwbackAlbum.songs.forEach(song => {
                console.log('Song File:', song.file);  // Logs the file of each song
            });
        }
    }, [throwbackAlbum]); // This ensures it runs only when `throwbackAlbum` is updated.

    // Check if the album data is found
    if (!throwbackAlbum) {
        return <p>Album not found</p>;
    }

    return (
        <>
            <DisplayNav />
            <div className='flex flex-col md:flex-row md:items-end gap-8 mt-10'>
                <img src={throwbackAlbum.image} alt="album cover" className='w-48 rounded' />
                <div className='flex flex-col'>
                    <p>Throwback Playlist</p>
                    <h2 className='font-bold mb-4 md:text-7xl text-5xl'>{throwbackAlbum.name}</h2>
                    <h4>{throwbackAlbum.desc}</h4>
                </div>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]">
                <p><b className='mr-4'>#</b>Title</p>
                <p>Album</p>
                <p className='hidden sm:block'>Date Added</p>
                <img className='m-auto w-4' src={assets.clock_icon} alt="duration" />
            </div>
            <hr />
            {
                throwbackAlbum.songs.map((song, index) => (
                    <div 
                        key={song.id} 
                        className='grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer pb-5'
                        onClick={() => {
                            console.log("Throwback Album ID:", throwbackAlbum.id); // Log the album ID
                            playWithSongId(song.id, "throwback", throwbackAlbum.id);
                        }}
                    >
                        <p className='text-white'>
                            <b className='mr-4 text-[#a7a7a7]'>{index + 1}</b>
                            {song.title}
                        </p>
                        <p className='text-[15px]'>{throwbackAlbum.name}</p>
                        <p className='text-[15px] hidden sm:block'>{song.dateAdded}</p>
                        <p className='text-[15px] text-center'>{song.duration}</p>
                    </div>
                ))
            }
        </>
    );
};

export default Throwback;
