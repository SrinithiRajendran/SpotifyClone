import React, { useContext, useEffect } from 'react';
import DisplayNav from '../DisplayNav';
import { useParams } from 'react-router-dom';
import { albumsData, assets } from '../../assets/assets'; // Adjust the path as necessary
import { PlayerContext } from '../../context/PlayerContext';

const AlbumsList = () => {
    const { id } = useParams();  // Use id from the route params
    const albumId = parseInt(id, 10);  // Ensure id is a number
    
    // Find the album based on the albumId
    const albumData = albumsData.find(album => album.id === albumId);
    const { playWithSongId } = useContext(PlayerContext);

    // Log the selected album only when `albumData` changes
    useEffect(() => {
        if (albumData) {
            console.log('Selected Album:', albumData.name);
            // Log each song file once
            albumData.songs.forEach(song => {
                console.log('Song File:', song.file);  // Logs the file of each song
            });
        }
    }, [albumData]); // This ensures it runs only when `albumData` is updated.

    // Check if the album data is found
    if (!albumData) {
        return <p>Album not found</p>;
    }

    return (
        <>
            <DisplayNav />
            <div className='flex flex-col md:flex-row md:items-end gap-8 mt-10'>
                <img src={albumData.image} alt="album cover" className='w-48 rounded' />
                <div className='flex flex-col'>
                    <p>Album Playlist</p>
                    <h2 className='font-bold mb-4 md:text-7xl text-5xl'>{albumData.name}</h2>
                    <h4>{albumData.desc}</h4>
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
                albumData.songs.map((song, index) => (
                    <div 
                        key={song.id} 
                        className='grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer pb-5'
                        onClick={() => {
                            console.log("Album ID:", albumData.id); // Log the album ID
                            playWithSongId(song.id, "albums", albumData.id); // Pass the song ID, source, and albumId
                        }}
                    >
                        <p className='text-white'>
                            <b className='mr-4 text-[#a7a7a7]'>{index + 1}</b>
                            {song.title}
                        </p>
                        <p className='text-[15px]'>{albumData.name}</p>
                        <p className='text-[15px] hidden sm:block'>{song.dateAdded}</p>
                        <p className='text-[15px] text-center'>{song.duration}</p>
                    </div>
                ))
            }
        </>
    );
};

export default AlbumsList;