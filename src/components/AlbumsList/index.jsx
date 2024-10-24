import React, { useContext, useEffect } from 'react';
import DisplayNav from '../DisplayNav';
import { useParams } from 'react-router-dom';
import { albumsData, assets } from '../../assets/assets'; 
import { PlayerContext } from '../../context/PlayerContext';

const AlbumsList = () => {
    const { id } = useParams();  
    const albumId = parseInt(id, 10);  
    
    
    const albumData = albumsData.find(album => album.id === albumId);
    const { playWithSongId } = useContext(PlayerContext);

   
    useEffect(() => {
        if (albumData) {
            console.log('selected Album:', albumData.name);
            albumData.songs.forEach(song => {
                console.log('Song File:', song.file);  
            });
        }
    }, [albumData]); 

   
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
            <div className="grid grid-cols-3 sm:grid-cols-4 mt-12 mb-4 pl-2 text-[#a7a7a7]">
                <div className='flex'><b className='mr-4'>#</b>
                    <p>Title</p></div>
                <p className='ml-2 '>Album</p>
                <p className='hidden sm:block '>Date Added</p>
                <img className='m-auto w-4' src={assets.clock_icon} alt="duration" />
            </div>
            <hr />
            {
                albumData.songs.map((song, index) => (
                    <div 
                        key={song.id} 
                        className='grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer pb-5'
                        onClick={() => {
                            console.log("Album ID:", albumData.id); 
                            playWithSongId(song.id, "albums", albumData.id); 
                        }}
                    >
                       <div className='text-white flex'>
                            <b className='mr-4 text-[#a7a7a7]'>{index + 1}</b>
                            <p className='truncate'>{song.title}</p>
                        </div>
                        <p className='ml-2 text-[12px] sm:text-[15px]'>{albumData.name}</p>
                        <p className='hidden sm:block text-[12px] sm:text-[15px]'>{song.dateAdded}</p>
                        <p className='text-center text-[12px] sm:text-[15px]'>{song.duration}</p>
                    </div>
                ))
            }
        </>
    );
};

export default AlbumsList;
