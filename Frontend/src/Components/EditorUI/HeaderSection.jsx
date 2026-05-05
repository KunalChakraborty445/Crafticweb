import { ArrowLeft } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const HeaderSection = ({ title }) => {
  return (
    <div className='h-14 px-4 flex items-center gap-2 border-b border-white/10 bg-black/50 backdrop-blur-sm'>
      <Link to="/dashboard" className='m-0 p-2'>
        <ArrowLeft />
      </Link>
      <span className='font-medium ml-0 text-sm tracking-tight truncate text-zinc-200 max-w-[240px] md:max-w-full'>
        {title || "Untitled Project"}
      </span>
      
    </div>
  )
}

export default HeaderSection