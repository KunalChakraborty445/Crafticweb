import { ArrowLeft, Sparkles, Send } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import axios from 'axios';
import { serverUrl } from '../App';



const steps = [
  "Understanding your idea...",
  "Designing the layout...",
  "Writing the content...",
  "Styling components...",
  "Polishing the details...",
];




const Generate = () => {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [generationStep, setGenerationStep] = useState(0);
  const intervalRef = useRef(null);
  

  
  const handleGenerate = async () => {
    if (!prompt) return;
    let websiteId = null;
    try {
      setIsGenerating(true);
      setGenerationStep(0);
      intervalRef.current = setInterval(() => {
        setGenerationStep(prev => {
          if (prev >= steps.length - 1) {
            clearInterval(intervalRef.current);
            return prev;
          }
          return prev + 1;
        });
      }, 1200);
      const result = await axios.post(
        `${serverUrl}/api/v1/website/generate`,
        { prompt },
        { withCredentials: true }
      );
      clearInterval(intervalRef.current);
       websiteId = result.data.websiteId;
      console.log('generate result:', result);
    } catch (error) {
       console.error('generate error:', error?.response || error);
        clearInterval(intervalRef.current);
        setIsGenerating(false);
    } finally {
      setIsGenerating(false);
      if(websiteId) navigate(`/editor/${websiteId}`);
    }
    
  }

  useEffect(() => () => clearInterval(intervalRef.current), []);

  return (
    <div className='min-h-screen bg-[#050505] text-white font-sans'>
      <div className='sticky top-0 z-40 backdrop-blur-sm bg-black/50 border-b border-white/10 p-4'>
        <div className='max-w-7xl mx-auto px-6 h-16 flex items-center justify-between'>
          <div className='flex items-center gap-4'>
            <button
              onClick={() => navigate('/dashboard')}
              className='p-2 rounded-lg hover:bg-white/10 transition'><ArrowLeft size={20} /></button>
            <h1 className='text-xl font-semibold'>CrafticWeb<span className='text-zinc-400'>.ai</span></h1>
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
              <div className='inline-flex items-center gap-2 px-3 py-1.5 rounded-full
               bg-yellow-400/10 border border-yellow-400/20 mb-6'>
                <span className='w-2 h-2 rounded-full bg-yellow-400 animate-pulse' />
                <span className='text-yellow-400 text-xs font-semibold tracking-widest uppercase'>
                  AI-Powered Website Builder
                </span>
              </div>

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
            className='w-full h-48 p-6 rounded-3xl bg-white/[0.03] border border-white/10
             focus:border-cyan-500/50 focus:outline-none transition-all resize-none text-lg placeholder:text-zinc-600'
          />
          
          <div className='absolute bottom-4 right-4 flex items-center gap-3'>
            <span className='text-xs text-zinc-500 font-mono'>
              {prompt.length} characters
            </span>
            <button
              disabled={!prompt || isGenerating}
              onClick={handleGenerate}
              className='p-3 rounded-2xl bg-white text-black disabled:bg-zinc-800 disabled:text-zinc-500
               hover:bg-cyan-400 transition-all flex items-center gap-2 font-bold'
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
              onClick={() => setPrompt(`A modern ${tag} website for...`)}
              className='px-4 py-1.5 rounded-full border border-white/5 bg-white/5 text-xs text-zinc-400 hover:bg-white/10 hover:text-white transition-colors'
            >
              + {tag}
            </button>
          ))}
        </div>
      </main>




       <AnimatePresence>
        {isGenerating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 z-[9999] bg-black/80 backdrop-blur-md flex items-center justify-center'
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className='flex flex-col items-center gap-10 px-10'
            >
              <div className='relative w-24 h-24'>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1.4, ease: "linear" }}
                  className='absolute inset-0 rounded-full border-2 border-transparent border-t-cyan-400 border-r-cyan-400/20'
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ repeat: Infinity, duration: 2.2, ease: "linear" }}
                  className='absolute inset-3 rounded-full border border-transparent border-b-yellow-400/40'
                />
                <div className='absolute inset-0 flex items-center justify-center'>
                  <motion.div
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                  >
                    <Sparkles className='text-cyan-400' size={22} />
                  </motion.div>
                </div>
              </div>
 
              <div className='flex flex-col items-start gap-4'>
                {steps.map((step, i) => (
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{
                      opacity: i <= generationStep ? 1 : 0.2,
                      x: 0,
                    }}
                    transition={{ delay: i * 0.08 }}
                    className='flex items-center gap-3'
                  >
                    <div className='relative w-2 h-2'>
                      {i === generationStep && (
                        <motion.div
                          className='absolute inset-0 rounded-full bg-cyan-400/30'
                          animate={{ scale: [1, 2, 1], opacity: [0.6, 0, 0.6] }}
                          transition={{ repeat: Infinity, duration: 1.2 }}
                        />
                      )}
                      <div className={`w-2 h-2 rounded-full ${
                        i < generationStep  ? 'bg-cyan-400' :
                        i === generationStep ? 'bg-white' :
                        'bg-white/20'
                      }`} />
                    </div>
 
                    <span className={`text-sm font-mono tracking-wide ${
                      i < generationStep  ? 'text-cyan-400' :
                      i === generationStep ? 'text-white' :
                      'text-white/20'
                    }`}>
                      {step}
                    </span>
 
                    {i < generationStep && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className='text-cyan-400 text-xs'
                      >
                        ✓
                      </motion.span>
                    )}
                  </motion.div>
                ))}
              </div>
 
              <p className='text-zinc-600 text-xs font-mono tracking-widest uppercase'>
                This may take a moment...
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Generate