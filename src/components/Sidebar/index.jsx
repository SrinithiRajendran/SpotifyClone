import React from 'react'
import { GoHomeFill } from "react-icons/go";
import { FaSearch } from "react-icons/fa";
import { BsStack } from "react-icons/bs";
import { FaArrowRight } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import "./index.css"


const Sidebar = () => {
  
  return (
    <div className='w-[25%] h-[117%] p-2 flex-col gap-2 text-white hidden lg:flex'>
     
      <div className='bg-[#121212] h-[85%] rounded'>
        <div className='p-4 flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <BsStack />
            <p className='font-semibold'>Your Library</p>
          </div>
          <div className='flex items-center gap-3'>
            <FaArrowRight />
            <FaPlus />
          </div>
        </div>
        <div className='p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4'>
          <h1 className='font-bold'>Create your first playlist</h1>
          <p className='font-light'>It's easy, we'll help you</p>
          <button className='px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4'>
            Create playlist
          </button>
        </div>
          <div className='p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4'>
          <h1 className='font-bold'>Explore Fresh Voices in Podcasting!</h1>
          <p className='font-light'>Stay Tuned for the Latest Episodes!</p>
          <button className='px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4'>
            Listen Shows
          </button>
        </div>


      
      </div>
    </div>
  )
}

export default Sidebar