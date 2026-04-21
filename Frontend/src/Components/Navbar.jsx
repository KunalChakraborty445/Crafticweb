import { BrainCircuitIcon, Coins } from 'lucide-react'
import { AnimatePresence } from 'motion/react';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'motion/react';
import axios from 'axios';
import { serverUrl } from '../App';
import { setUserData } from '../redux/userSlice';

const Navbar = ({openLoginHandler}) => {

    const { userData } = useSelector(state => state.user);
    const [openProfile, setOpenProfile] = useState(false);
    const dispatch = useDispatch();

    const handleLogout = async()=>{
        try {
            await axios.get(`${serverUrl}/api/v1/auth/logout`, { withCredentials: true });
            dispatch(setUserData(null));
            setOpenProfile(false);
        } catch (error) {
            console.log(error);
        }
    }


  return (
    <div className='max-w-7xl mx-auto  px-6 py-4 flex justify-between items-start '> 
            <div className='text-xl pt-2 font-semibold flex items-center gap-2'>
                <div className='w-7 h-7 rounded-lg bg-white flex items-center justify-center'>
                    <BrainCircuitIcon size={15} className="text-black" />
                </div>
                CrafticWeb.ai
            </div>
            <div className='flex items-center gap-5'>
                <div className='px-4 py-2 rounded-lg hidden md:inline text-md text-zinc-400 hover:text-white cursor-pointer'>
                    Pricing
                </div>
                
                {userData &&
                <div className=' flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm
                 cursor-pointer hover:bg-white/10 transition'>
                    <Coins  className='text-yellow-500'/>
                    <span className='text-zinc-300 hidden md:inline'>Credits</span>
                    <span>{userData.credits}+</span>
                   
                    
                </div>}
            


                {!userData ? 
                    <button
                        onClick={openLoginHandler}
                        className='cursor-pointer px-4 py-2 rounded-lg border-zinc-700 border-2 text-white hover:bg-white hover:text-slate-600 transition duration-75'>
                        Get Started
                    </button> :

                    <div className='relative'>     
                    <button
                    onClick={() => setOpenProfile(!openProfile)}
                     className='cursor-pointer rounded-full p-0 border-0 bg-transparent overflow-hidden'>
                        <img 
                            src={userData.avatar || `https://ui-avatars.com/api/?name=${userData.name}`} 
                            alt={userData.name}
                            referrerPolicy="no-referrer"
                            className='w-9 h-9 rounded-full object-cover border-2 border-zinc-700 hover:border-white transition duration-75'
                        />
                    </button>  
                    <AnimatePresence>
                        {openProfile && (
                            <>
                                <motion.div
                                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 0.95}}
                                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                className='absolute right-0 mt-3 w-60 z-50 rounded-xl
                                bg-[#0b0b0b] border border-white/10 shadow-2xl overflow-hidden' 
                                >
                                    <div className='px-4 py-3 border-b border-white/10'>
                                        <p className='text-sm font-medium truncate'>{userData.name}</p>
                                        <p className='text-xs text-zinc-500 truncate'>{userData.email}</p>
                                    </div>

                                    <button
                                    className='md:hidden w-full px-4 py-3 flex items-center gap-2
                                     text-sm border-b border-white/10 hover:bg-white/5'
                                    >
                                        <span className='text-zinc-400'>Plan:</span>
                                        <span>{userData.plan}</span>
                                    </button>

                                    <button className='w-full px-4 py-3 text-left text-sm hover:bg-white/5'>Dashboard</button>
                                    <button
                                    onClick={handleLogout}
                                    className='w-full px-4 py-4 text-left text-sm hover:bg-white/5 text-red-400'>Logout</button>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>
                    </div>
                }
                
            </div>
        </div>
  )
}

export default Navbar

//3.30 hours on points
