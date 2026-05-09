import React, { useEffect, useState, useRef } from 'react'
import { Plus, Layout, ExternalLink, Trash2, Pencil, Copy, CopyCheck } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import axios from 'axios'
import { serverUrl } from '../App'

// Renders a thumbnail preview using a Blob URL (avoids Vite script injection)
const ProjectThumbnail = ({ code }) => {
  const iframeRef = useRef(null)

  useEffect(() => {
    if (!iframeRef.current || !code) return
    const blob = new Blob([code], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    iframeRef.current.src = url
    return () => URL.revokeObjectURL(url)
  }, [code])

  return (
    <iframe
      ref={iframeRef}
      title="preview"
      className='absolute inset-0 w-[140%] h-[140%] scale-[0.72] origin-top-left pointer-events-none bg-white'
      sandbox='allow-scripts allow-same-origin'
    />
  )
}

const Dashboard = () => {
  const { userData } = useSelector(state => state.user)
  const navigate = useNavigate()
  const [website, setWebsite] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [copiedId, setCopiedId] = useState(null)
  const [deployingId, setDeployingId] = useState(null)

  const handleDeploy = async (id) => {
    setDeployingId(id)
    try {
      const result = await axios.get(
        `${serverUrl}/api/v1/website/deploy/${id}`,
        { withCredentials: true }
      )
      // ✅ Update only that project in state so card re-renders immediately
      setWebsite(prev => prev.map(site =>
        site._id === id
          ? { ...site, deployed: true, deployUrl: result.data.url }
          : site
      ))
      window.open(result.data.url, "_blank")
    } catch (error) {
      console.log(error)
    } finally {
      setDeployingId(null)
    }
  }

  const handleCopyLink = (project) => {
    navigator.clipboard.writeText(project.deployUrl)
    setCopiedId(project._id)
    setTimeout(() => setCopiedId(null), 1500)
  }

  useEffect(() => {
    const handleGetAllWebsites = async () => {
      setLoading(true)
      try {
        const getWebsite = await axios.get(
          `${serverUrl}/api/v1/website/getAllWebsite`,
          { withCredentials: true }
        )
        setWebsite(getWebsite.data || [])
      } catch (error) {
        console.log(error)
        setError(error.response?.data?.message || "Failed to load projects")
      } finally {
        setLoading(false)
      }
    }
    handleGetAllWebsites()
  }, [])

  return (
    <div className='min-h-screen bg-[#050505] text-white font-sans'>
      <Navbar />

      <main className='max-w-6xl mx-auto px-6 py-12'>
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

        {loading && (
          <div className='border border-dashed border-white/10 rounded-3xl py-20 flex flex-col items-center justify-center bg-white/[0.02]'>
            Loading projects...
          </div>
        )}

        {error && (
          <div className='border border-dashed text-red-400 border-white/10 rounded-3xl py-20 flex flex-col items-center justify-center bg-white/[0.02]'>
            {error}
          </div>
        )}

        {!loading && !error && website.length === 0 ? (
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
              {website.map((project, index) => (
                <motion.div
                  key={project._id || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className='group bg-white/[0.03] border border-white/10 rounded-2xl hover:border-cyan-500/50 transition-all overflow-hidden'
                >
                  <div className='relative h-40 overflow-hidden rounded-t-2xl'>
                    <ProjectThumbnail code={project.latestCode} />
                    <div className='absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10'>
                      {!project.deployed && (
                        <button
                          onClick={() => navigate(`/editor/${project._id}`)}
                          className='p-2 hover:text-blue-400'
                        >
                          <Pencil size={18} />
                        </button>
                      )}
                      <button className='p-2 hover:text-red-400'>
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>

                  <div className='p-5'>
                    <h3 className='text-xl font-semibold mb-1'>{project.title}</h3>
                    <p className='text-white/40 text-sm'>
                      Last edited {new Date(project.updatedAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div className='px-5 pb-4'>
                    {project.deployed ? (
                      <div className='flex justify-between items-center'>
                        <motion.button
                          onClick={() => handleCopyLink(project)}
                          className='flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full
                            bg-emerald-500/10 text-emerald-400 border border-emerald-500/20
                            hover:bg-emerald-500/20 transition'
                        >
                          {copiedId === project._id
                            ? <><CopyCheck size={14} /> Copied!</>
                            : <><Copy size={14} /> Share Link</>
                          }
                        </motion.button>

                        <span className='flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full
                          bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'>
                          <span className='w-2 h-2 rounded-full bg-emerald-500 animate-pulse' />
                          Live
                        </span>
                      </div>
                    ) : (
                      <motion.button
                        onClick={() => handleDeploy(project._id)}
                        disabled={deployingId === project._id}
                        className='w-full flex items-center justify-center gap-1 text-xs px-3 py-1.5 rounded-full
                          bg-white text-black font-bold transition-all duration-300
                          hover:bg-gradient-to-br hover:from-blue-400 hover:via-white hover:to-yellow-300
                          disabled:opacity-50 disabled:cursor-not-allowed'
                      >
                        {deployingId === project._id ? 'Deploying...' : 'Deploy'}
                      </motion.button>
                    )}
                  </div>
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