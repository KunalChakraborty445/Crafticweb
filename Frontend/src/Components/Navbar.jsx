import React from 'react'

const Navbar = () => {
  return (
    <div className='max-w-7xl mx-auto  px-6 py-4 flex justify-between items-start '> 
            <div className='text-xl pt-2 font-semibold'>
                CrafticWeb.ai
            </div>
            <div className='flex items-center gap-5'>
                <div className='px-4 py-2 rounded-lg hidden md:inline text-md text-zinc-400 hover:text-white cursor-pointer'>
                    Pricing
                </div>
                <button className='cursor-pointer px-4 py-2 rounded-lg border-zinc-700 border-2 text-white hover:bg-white hover:text-slate-600  transition duration-75 md:hover:bg-white md:hover:text-slate-600  md:transition md:duration-75'>
                    Get Started
                </button>
            </div>
        </div>
  )
}

export default Navbar
