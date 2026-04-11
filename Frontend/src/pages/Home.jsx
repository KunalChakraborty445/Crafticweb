import React from 'react'
import {motion} from 'motion/react';
import Navbar from '../Components/Navbar';
import { BrainCircuitIcon } from 'lucide-react';
import HeroSection from '../Components/HeroSection';
import CardHomeSection from '../Components/CardHomeSection';
import Footer from '../Components/Footer';

const Home = () => {
  return (
    <div className='relative min-h-screen bg-[#040404] text-white overflow-hidden'>
      <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: 'easeInOut' }}
      className='fixed top-0 right-0 left-0 z-50 backdrop-blur-xl bg-black/40 border-b border-white/10'
      >
        <Navbar />
      </motion.div>

       <HeroSection />

       <CardHomeSection />

       <Footer />
    </div>
  )
}

export default Home
