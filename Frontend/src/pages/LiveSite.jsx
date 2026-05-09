import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { serverUrl } from '../App'
import axios from 'axios'

const LiveSite = () => {
  const { id } = useParams()
  const [html, setHtml] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const iframeRef = useRef(null)

  useEffect(() => {
    const controller = new AbortController()

    const handleGetWebsite = async () => {
      try {
        setLoading(true)
        setError('')
        const result = await axios.get(
          `${serverUrl}/api/v1/website/getWebsite-by-slug/${id}`,
          { withCredentials: true, signal: controller.signal }
        )
        setHtml(result.data.latestCode)
      } catch (err) {
        if (axios.isCancel(err)) return
        setError('Site not found')
      } finally {
        setLoading(false)
      }
    }

    handleGetWebsite()
    return () => controller.abort()
  }, [id])

  // Use Blob URL instead of srcDoc to avoid Vite injecting scripts
  useEffect(() => {
    if (!iframeRef.current || !html) return
    const blob = new Blob([html], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    iframeRef.current.src = url
    return () => URL.revokeObjectURL(url)
  }, [html])

  if (loading) {
    return (
      <div className='h-screen flex items-center justify-center bg-black text-white'>
        <span className='animate-spin mr-2'>⏳</span> Loading...
      </div>
    )
  }

  if (error) {
    return (
      <div className='h-screen flex items-center justify-center bg-black text-white'>
        {error}
      </div>
    )
  }

  return (
    <iframe
      ref={iframeRef}
      title='Live Site'
      className='w-screen h-screen border-none'
      sandbox='allow-scripts allow-same-origin allow-forms allow-popups'
    />
  )
}

export default LiveSite