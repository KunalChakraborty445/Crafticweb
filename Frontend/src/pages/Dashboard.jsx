import React from 'react'
import { Plus, Layout, ExternalLink, Trash2 } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Navbar from '../Components/Navbar'

const Dashboard = () => {
  const { userData } = useSelector(state => state.user);
  const navigate = useNavigate();

  
  const projects = [
    // { id: 1, title: 'InsiderJob', status: 'Live', date: '2 days ago' }
  ];

  return (
    <div className='min-h-screen bg-[#050505] text-white font-sans'>
      <Navbar />

      <main className='max-w-6xl mx-auto px-6 py-12'>
        {/* Header Section */}
        <div className='flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12'>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className='text-cyan-400 font-mono text-sm tracking-widest uppercase mb-2'>Overview</p>
            <h2 className='text-4xl font-bold'>Welcome, {userData?.name?.split(' ')[0] || 'User'}</h2>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/generate')}
            className='flex items-center justify-center gap-2 bg-white text-black px-6 py-3 rounded-full font-bold
             transition-colors hover:bg-gradient-to-br from-blue-500 via-white/20 to-yellow-400'
          >
            <Plus size={20} />
            New Project
          </motion.button>
        </div>

        {projects.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='border border-dashed border-white/10 rounded-3xl py-20 flex flex-col items-center justify-center bg-white/[0.02]'
          >
            <div className='p-4 rounded-full bg-white/5 mb-4'>
                <Layout className='text-white/20' size={32} />
            </div>
            <p className='text-white/40 mb-6'>No projects found. Let's build something.</p>
            <button 
                onClick={() => navigate('/generate')}
                className='text-cyan-400 hover:underline text-sm font-medium'
            >
                Create your first project →
            </button>
          </motion.div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            <AnimatePresence>
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className='group bg-white/[0.03] border border-white/10 p-6 rounded-2xl hover:border-cyan-500/50 transition-all'
                >
                  <div className='flex justify-between items-start mb-10'>
                    <div className='h-10 w-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600' />
                    <div className='flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity'>
                        <button className='p-2 hover:text-cyan-400'><ExternalLink size={18}/></button>
                        <button className='p-2 hover:text-red-400'><Trash2 size={18}/></button>
                    </div>
                  </div>
                  <h3 className='text-xl font-semibold mb-1'>{project.title}</h3>
                  <p className='text-white/40 text-sm'>Last edited {project.date}</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>
    </div>
  )
}

export default Dashboard