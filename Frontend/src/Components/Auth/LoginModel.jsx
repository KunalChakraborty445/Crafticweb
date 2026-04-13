import React from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { X } from 'lucide-react'

const LoginModel = ({open, onClose}) => {
  return (
    <AnimatePresence>
    {open &&
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    onClick={onClose}
    className='fixed inset-0 z-100 flex items-center justify-center bg-black/80 backdrop-blur-xl px-4'
    >
      <motion.div
      initial={{ scale: 0.88, opacity: 0, y: 60 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.9, opacity: 0, y: 40 }}
      transition={{ duration: 0.45, ease: "easeInOut" }}
      className='relative w-full max-w-md p-[1px] rounded-3xl bg-gradient-to-br from-blue-500/65
       via-yellow-300/35 to-transparent'
       onClick={(e)=>e.stopPropagation()}
      >
        <div className='relative rounded-3xl bg-[#0b0b0b] border border-white/10 
        shadow-[0_30px_120px_rgba(0,0,0,0.8)] overflow-hidden'>

            <motion.div
            initial={{ opacity: [0.25, 0.4, 0.25]}}
            transition={{ duration: 6, repeat: Infinity }}
            className='absolute -top-32 -left-32 w-80 h-80 bg-blue-500/30 blur-[140px]'
            />
            <motion.div
            initial={{ opacity: [0.2, 0.35, 0.2]}}
            transition={{ duration: 6, repeat: Infinity,  delay:2 }}
            className='absolute -bottom-32 -right-32 w-80 h-80 bg-yellow-300/30 blur-[140px]'
             />


             <button
             className='absolute top-5 right-5 z-20 text-zinc-400 hover:text-white transition text-lg'
             >
                <X onClick={onClose} />
             </button>

             <div className='relative px-8 pt-14 pb-10 text-center'>
                <h1 className='inline-block mb-6 px-4 py-1.5 rounded-full bg-white/5 boder border-white/10  text-xs font-bold text-zinc-400'>
                 AI powered website builder
                </h1>

                <h2 className='text-3xl font-semibold leading-tight mb-3 space-x-2'>
                    <span>Welcome to</span>
                    <span className='bg-linear-to-r from-blue-600 to-yellow-400 bg-clip-text text-transparent'>CrafticWeb.ai</span>
                </h2>

               <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.0 }}
                    className='mt-8 px-8 py-3.5 rounded-xl bg-white text-black font-semibold 
                    flex items-center justify-center gap-2 w-full
                    hover:-translate-y-1 hover:scale-105 transition duration-300'
                    >
                    <img
                        className='flex-shrink-0 h-5 w-5'
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSh4wNeYZWvcRFFP5VXoKpPZgWNy90AuIQLQmqF0QQtbVfXrcvBM1ti0RW1PMgG24AldAu58TuO2XBE-BryD3-Vg8&s&ec=121630540"
                        alt="Google"
                    />
                    Continue with Google
            </motion.button>
             </div>
        </div>
        
      </motion.div>
    </motion.div>
    }
    
    </AnimatePresence>
  )
}

export default LoginModel
