import React, { useContext } from 'react'
import Sidebar from './components/Sidebar/index.jsx'
import Navbar from './components/Navbar/index.jsx'
import MusicPlayer from './components/MusicPlayer/index.jsx'
import DisplayMusic from './components/DisplayMusic/index.jsx'
import { PlayerContext } from './context/PlayerContext.jsx'

const App = () => {
  const { audioRef,musicTrack } = useContext(PlayerContext)
  
  return (
    <div className='h-screen bg-black'>
      <Navbar />
      <div className='h-[80%] flex '>
        <Sidebar/>
        <DisplayMusic/>
      </div>
      <MusicPlayer />
      <audio preload="auto"  ref={audioRef} src={musicTrack.file}></audio>
    </div>
  )
}

export default App