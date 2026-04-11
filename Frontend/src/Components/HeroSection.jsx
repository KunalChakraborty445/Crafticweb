import React from 'react'
import { motion } from 'motion/react'

const HeroSection = () => {


  return (
     <section className='pt-44 pb-32 px-6 text-center'>
        <motion.h1
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
         transition={{ duration: 0.6, ease: "easeIsOut", delay: 0.1 }}
        className='text-4xl md:text-6xl font-bold leading-tight'
        >
            Building Stunning Websites <br className='hidden sm:inline'/>
            <span className='bg-linear-to-r from-blue-600 via-red-50 to-yellow-400 bg-clip-text text-transparent'>with AI </span>
        </motion.h1>

        <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.25 }}
        className='mt-8 max-w-2xl mx-auto text-zinc-400 text-lg'
        >
          Describe your idea and let AI generate a 
          modern, responsive, production-ready website
        </motion.p>

          <button
          className='px-10 py-4 rounded-xl bg-white text-black font-semibold 
          mt-12  transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110'
          >Get Started
          </button>  
        </section>
  )
}

export default HeroSection
