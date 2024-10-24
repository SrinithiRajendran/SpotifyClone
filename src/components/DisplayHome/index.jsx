import React, { useState } from 'react';
import DisplayNav from '../DisplayNav';
import { albumsData, artistsData, podcastData, trendinghits, throwbackData } from '../../assets/assets';
import AlbumItem from '../AlbumItem';
import Podcasts from '../Podcasts';
import ArtistsList from '../ArtistsList';
import TrendingHits from '../TrendingHits';
import ThrowbackItem from '../ThrowbackItem'; 

const DisplayHome = () => {
  const [activeTab, setActiveTab] = useState('All'); 

  
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <DisplayNav onTabChange={handleTabChange} /> 
      
     
      {activeTab === 'All' && (
        <>
          <div className='mb-4'>
            <h1 className='font-bold text-2xl my-5'>Greatest Hits from Your Favorite Artists!</h1>
            <div className='flex overflow-auto'>
              {artistsData.map((each, index) => (
                <ArtistsList key={index} artistsDetails={each} />
              ))}
            </div>
          </div>
          
          <div className='mb-4'>
            <h1 className='font-bold text-2xl my-5'>Featured Charts</h1>
            <div className='flex overflow-auto'>
              {albumsData.map((each, index) => (
                <AlbumItem key={index} albumDetails={each} />
              ))}
            </div>
          </div>
          
          <div className='mb-4'>
            <h1 className='font-bold text-2xl my-5'>Trending Hits</h1>
            <div className='flex overflow-auto'>
              {trendinghits.map((each, index) => (
                <TrendingHits key={index} trendingDetails={each} />
              ))}
            </div>
          </div>
          
          <div className='mb-4'>
            <h1 className='font-bold text-2xl my-5'>Throwback: Evergreen Tamil Melodies!</h1>
            <div className='flex overflow-auto'>
              {throwbackData.map((each, index) => (
                <ThrowbackItem key={index} throwbackDetails={each} />
              ))}
            </div>
          </div>
          
          <div className='mb-4'>
            <h1 className='font-bold text-2xl my-5'>Stay in the Loop with Top Podcasts!</h1>
            <div className='flex overflow-auto'>
              {podcastData.map((each, index) => (
                <Podcasts key={index} songDetails={each} />
              ))}
            </div>
          </div>
        </>
      )}

      {activeTab === 'Music' && (
        <>
          <div className='mb-4'>
            <h1 className='font-bold text-2xl my-5'>Featured Charts</h1>
            <div className='flex overflow-auto'>
              {albumsData.map((each, index) => (
                <AlbumItem key={index} albumDetails={each} />
              ))}
            </div>
          </div>
          
          <div className='mb-4'>
            <h1 className='font-bold text-2xl my-5'>Trending Hits</h1>
            <div className='flex overflow-auto'>
              {trendinghits.map((each, index) => (
                <TrendingHits key={index} trendingDetails={each} />
              ))}
            </div>
          </div>
          
          <div className='mb-4'>
            <h1 className='font-bold text-2xl my-5'>Throwback: Evergreen Tamil Melodies!</h1>
            <div className='flex overflow-auto'>
              {throwbackData.map((each, index) => (
                <ThrowbackItem key={index} throwbackDetails={each} /> 
              ))}
            </div>
          </div>
        </>
      )}

      {activeTab === 'Podcasts' && (
        <div className='mb-4'>
          <h1 className='font-bold text-2xl my-5'>Stay in the Loop with Top Podcasts!</h1>
          <div className='flex overflow-auto'>
            {podcastData.map((each, index) => (
              <Podcasts key={index} songDetails={each} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DisplayHome;
