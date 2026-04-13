import React from 'react'
import { motion } from 'motion/react'

const codeSnippets = [
  { code: '<div className="hero"/>', top: '20%', left: '5%', delay: 0 },
  { code: 'const ai = new AI()', top: '60%', left: '2%', delay: 0.5 },
  { code: 'npm run build', top: '30%', right: '3%', delay: 1 },
  { code: 'export default App', top: '70%', right: '5%', delay: 0.3 },
  { code: 'tailwind.config.js', top: '45%', left: '3%', delay: 0.8 },
  { code: 'bg-gradient-to-br', top: '80%', right: '4%', delay: 0.6 },
]

const HeroSection = () => {
  return (
    <section className='relative overflow-hidden pt-44 pb-32 px-6 text-center'>

      <div className='absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]
       bg-blue-600/10 rounded-full blur-3xl pointer-events-none' />
      <div className='absolute top-1/2 left-1/3 w-[300px] h-[300px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none' />

      {codeSnippets.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: [0, -10, 0] }}
          transition={{ delay: item.delay, duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          style={{ top: item.top, left: item.left, right: item.right }}
          className='absolute hidden lg:block text-xs font-mono px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white backdrop-blur-sm'
        >
          {item.code}
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.0 }}
        className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-purple-500/10 text-blue-300 text-sm mb-6'
      >
        <span className='w-2 h-2 rounded-full bg-yellow-400 animate-pulse' />
        AI-Powered Website Builder
      </motion.div>

      <motion.h1
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
        className='text-4xl md:text-6xl font-bold leading-tight'
      >
        Building Stunning Websites <br className='hidden sm:inline' />
        <span className='bg-gradient-to-r from-blue-400 via-white
         to-yellow-400 bg-clip-text text-transparent'>
          with AI
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.25 }}
        className='mt-6 max-w-xl mx-auto text-zinc-400 text-lg leading-relaxed'
      >
        Describe your idea and let AI generate a
        modern, responsive, production-ready website in seconds.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
        className='flex items-center justify-center gap-4 mt-10'
      >
        <button className='px-8 py-3.5 rounded-xl bg-white text-black font-semibold 
        hover:-translate-y-1 hover:scale-105 transition duration-300'>
          Get Started
        </button>
        
      </motion.div>

    </section>
  )
}

export default HeroSection