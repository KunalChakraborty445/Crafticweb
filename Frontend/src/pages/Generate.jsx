import { ArrowLeft, Sparkles, Send } from 'lucide-react';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';

const Generate = () => {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    console.log("generating");
    
  }

  return (
    <div className='min-h-screen bg-[#050505] text-white font-sans'>
      <div className='sticky top-0 z-40 backdrop-blur-sm bg-black/50 border-b border-white/10 p-4'>
        <div className='max-w-7xl mx-auto px-6 h-16 flex items-center justify-between'>
          <div className='flex items-center gap-4'>
            <button
              onClick={() => navigate('/dashboard')}
              className='p-2 rounded-lg hover:bg-white/10 transition'><ArrowLeft size={20} /></button>
            <h1 className='text-xl font-semibold'>CrafticWeb.<span className='text-zinc-400'>Ai</span></h1>
          </div>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='text-sm italic text-cyan-400 font-medium'
          >
            Generate · New Site
          </motion.span>
        </div>
      </div>

      <main className='max-w-3xl mx-auto px-6 pt-24 pb-12'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='text-center mb-12'
        >
          <h2 className='text-4xl md:text-5xl font-bold mb-4'>What are we building?</h2>
          <p className='text-zinc-400 text-lg'>Describe your vision, and our AI will handle the rest.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className='relative group'
        >
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g. A dark minimalist portfolio for a software engineer with a focus on typography..."
            className='w-full h-48 p-6 rounded-3xl bg-white/[0.03] border border-white/10 focus:border-cyan-500/50 focus:outline-none transition-all resize-none text-lg placeholder:text-zinc-600'
          />
          
          <div className='absolute bottom-4 right-4 flex items-center gap-3'>
            <span className='text-xs text-zinc-500 font-mono'>
              {prompt.length} characters
            </span>
            <button
              disabled={!prompt || isGenerating}
              onClick={handleGenerate}
              className='p-3 rounded-2xl bg-white text-black disabled:bg-zinc-800 disabled:text-zinc-500 hover:bg-cyan-400 transition-all flex items-center gap-2 font-bold'
            >
              {isGenerating ? (
                <motion.div 
                  animate={{ rotate: 360 }} 
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                >
                  <Sparkles size={20} />
                </motion.div>
              ) : (
                <>
                  <span className='text-sm ml-1'>Generate</span>
                  <Send size={18} />
                </>
              )}
            </button>
          </div>
        </motion.div>

        <div className='flex flex-wrap gap-2 mt-6 justify-center'>
          {['Portfolio', 'SaaS Landing Page', 'Blog', 'E-commerce'].map((tag) => (
            <button 
              key={tag}
              onClick={() => setPrompt(`A modern ${tag} for...`)}
              className='px-4 py-1.5 rounded-full border border-white/5 bg-white/5 text-xs text-zinc-400 hover:bg-white/10 hover:text-white transition-colors'
            >
              + {tag}
            </button>
          ))}
        </div>
      </main>
    </div>
  )
}

export default Generate