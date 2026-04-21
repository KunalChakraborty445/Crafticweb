import React, { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { X } from 'lucide-react'
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../../FireBase.js'
import axios from 'axios'
import { serverUrl } from '../../App'
import { useDispatch } from 'react-redux'
import { setUserData } from '../../redux/userSlice.js'

const LoginModel = ({ open, onClose }) => {
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch();
  const handleGoogleAuth = async () => {
    setLoading(true)
    try {
      const response = await signInWithPopup(auth, provider)
      const { data } = await axios.post(`${serverUrl}/api/v1/auth/register`, {
        name: response.user.displayName,
        email: response.user.email,
        avatar: response.user.photoURL
      }, { withCredentials: true })

      dispatch(setUserData(data.user))
      onClose()
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {open && (
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
            className='relative w-full max-w-md p-[1px] rounded-3xl bg-gradient-to-br from-blue-500/65 via-yellow-300/35 to-transparent'
            onClick={(e) => e.stopPropagation()}
          >
            <div className='relative rounded-3xl bg-[#0b0b0b] border border-white/10 shadow-[0_30px_120px_rgba(0,0,0,0.8)] overflow-hidden'>

              {/* Glow blobs */}
              <motion.div
                animate={{ opacity: [0.25, 0.4, 0.25] }}
                transition={{ duration: 6, repeat: Infinity }}
                className='absolute -top-32 -left-32 w-80 h-80 bg-blue-500/30 blur-[140px]'
              />
              <motion.div
                animate={{ opacity: [0.2, 0.35, 0.2] }}
                transition={{ duration: 6, repeat: Infinity, delay: 2 }}
                className='absolute -bottom-32 -right-32 w-80 h-80 bg-yellow-300/30 blur-[140px]'
              />

              {/* Close button */}
              <button
                onClick={onClose}
                className='absolute top-5 right-5 z-20 text-zinc-400 hover:text-white transition cursor-pointer'
              >
                <X size={18} />
              </button>

              <div className='relative px-8 pt-14 pb-10 text-center'>
                {/* Badge */}
                <h1 className='inline-block mb-6 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-zinc-400'>
                  AI powered website builder
                </h1>

                {/* Heading */}
                <h2 className='text-3xl font-semibold leading-tight mb-6'>
                  <span className='text-white'>Welcome to </span>
                  <span className='bg-gradient-to-r from-blue-400 to-yellow-400 bg-clip-text text-transparent'>
                    CrafticWeb.ai
                  </span>
                </h2>

                {/* Google button */}
                <motion.button
                  onClick={handleGoogleAuth}
                  disabled={loading}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mt-2 px-4 py-2 rounded-lg bg-white text-black text-sm font-medium
                    flex items-center gap-2 mx-auto
                    shadow-[0_1px_2px_rgba(0,0,0,0.15)]
                    hover:-translate-y-px hover:scale-[1.03] hover:shadow-[0_4px_12px_rgba(0,0,0,0.2)]
                    active:scale-[0.96] active:translate-y-px
                    transition-[transform,box-shadow] duration-150 cursor-pointer
                    disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none"
                >
                  {!loading && (
                    <img
                      className="h-4 w-4 object-contain"
                      src="https://www.citypng.com/public/uploads/preview/google-logo-icon-gsuite-hd-701751694791470gzbayltphh.png"
                      alt="Google logo"
                    />
                  )}
                  {loading ? 'Signing in...' : 'Continue with Google'}
                </motion.button>
              </div>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default LoginModel