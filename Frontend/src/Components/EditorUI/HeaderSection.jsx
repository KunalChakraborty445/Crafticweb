import React from 'react'

const HeaderSection = ({ title }) => {
  return (
    <div className='h-14 px-4 flex items-center justify-between border-b border-white/10 bg-black/50 backdrop-blur-sm'>
      {/* Added items-center and a subtle backdrop blur for that premium feel */}
      <span className='font-medium text-sm tracking-tight truncate text-zinc-200 max-w-[240px] md:max-w-full'>
        {title || "Untitled Project"}
      </span>
      
    </div>
  )
}

export default HeaderSection