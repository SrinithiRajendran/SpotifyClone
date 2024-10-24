import React from 'react'
import { CiSearch } from "react-icons/ci";
import { TbHeartSearch } from "react-icons/tb";
import { GoHomeFill } from "react-icons/go";
import { BsSpotify } from "react-icons/bs";
import "./index.css"
import { GrInstallOption } from "react-icons/gr";
import { useNavigate, Link } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  return (
      <nav className='justify-between text-white hidden md:flex'>
          
        <div className='flex items-center'>
           <BsSpotify className='text-4xl mr-10 cursor-pointer'  onClick={()=>navigate('/')}/>
           <div className='flex'>
                <GoHomeFill className='cursor-pointer text-5xl mr-3 flex items-center justify-center rounded-full bg-[#242424] nav-home-logo'  onClick={()=>navigate('/')}/>
                <div className='search-container'>
                    <div className='flex search'>
                        <CiSearch className='text-2xl mr-3'/>
                        <input className="input-search w-80 " type="search" placeholder='What do you want to play?'/>
                    </div>
                    <div className='flex'>
                        <p className='text-1xl font-light mr-3'>|</p>
                        <TbHeartSearch className='text-2xl mr-1'/>
                    </div>
                </div>
            </div>
        </div>
          
  
   <div className='hide items-center gap-2 sm:gap-3 md:gap-4'>
    <Link to="/explore-premium">
        <button className='bg-white rounded-2xl text-gray-900 text-[10px] sm:text-[12px] md:text-[13px] lg:text-[15px] px-2 sm:px-3 md:px-4 py-1 cursor-pointer'>
            Explore Premium
        </button>
    </Link>
    <div className='flex items-center'>
        <GrInstallOption className='text-[12px] sm:text-[13px] md:text-[15px]' />
        <button className='bg-transparent py-1 px-2 sm:px-3 text-[10px] sm:text-[12px] md:text-[14px] lg:text-[15px] cursor-pointer'>
            Install App
        </button>
    </div>
    <p className='bg-blue-500 text-black w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 rounded-full flex items-center justify-center text-[10px] sm:text-[12px] md:text-[13px] lg:text-[15px]'>
        S
    </p>
</div>





    </nav>
  )
}

export default Navbar