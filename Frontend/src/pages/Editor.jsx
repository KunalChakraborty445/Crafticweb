import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { serverUrl } from '../App';
import { useParams } from 'react-router-dom';
import HeaderSection from '../Components/EditorUI/HeaderSection';
import { ChatSection } from '../Components/EditorUI/ChatSection';
import { Code2, Coins, MessageSquare, Monitor, Rocket, X } from 'lucide-react';
import { useSelector } from 'react-redux';

const Editor = () => {
    const { userData } = useSelector(state => state.user);
    const { id } = useParams();
    const [website, setwebsite] = useState(null);
    const [websiteError, setWebsiteError] = useState("");
    const iframeRef = useRef(null);
    const [code, setCode] =useState("")
    const [message, setMessage] =useState([])
    const [isLoading, setIsLoading] = useState(false) 
        const [showChat, setShowChat] = useState(false) 
    

const handleUpdate = async (prompt) => {
    setMessage((m) => [...m, { role: "user", content: prompt }])
    setIsLoading(true)
    try {
        const result = await axios.post(
            `${serverUrl}/api/v1/website/updateWeb/${id}`,
            { prompt },
            { withCredentials: true }
        )
        setMessage((m) => [...m, { role: "ai", content: result.data.message }])
        setCode(result.data.code);
    } catch (error) {
        const errMsg = error.response?.data?.message || "Something went wrong"
        console.error("Server says:", errMsg)

        setMessage((m) => [...m, { 
            role: "ai", 
            content: `⚠️ ${errMsg}`   
        }])
    } finally {
        setIsLoading(false)
    }
}

    useEffect(() => {
        if (website?.conversation && message.length === 0) {
            setMessage(website.conversation);
        }
    }, [website]);

    useEffect(() => {
        const handleGetWebsite = async () => {
            try {
                const result = await axios.get(`${serverUrl}/api/v1/website/getWebsite-by-id/${id}`,
                    { withCredentials: true }
                );
                setwebsite(result.data.website || result.data);
            } catch (error) {
                setWebsiteError(error.response?.data?.message || "Failed to load project");
            }
        }
        handleGetWebsite();
    }, [id]);

    useEffect(() => {
        if (!iframeRef.current) return;
        const latestCode = code || website?.latestCode;  
        if (!latestCode) return;
        const blob = new Blob([latestCode], { type: "text/html" });
        const url = URL.createObjectURL(blob);
        iframeRef.current.src = url;
        return () => URL.revokeObjectURL(url);
    }, [code, website?.latestCode]);

    if (websiteError) return (
        <div className='h-screen flex items-center justify-center bg-[#050505] text-red-400 font-mono'>
            {websiteError}
        </div>
    );

    if (!website) return (
        <div className='h-screen flex items-center justify-center bg-[#050505]'>
            <div className='animate-pulse text-zinc-600 tracking-tighter'>Crafting Workspace...</div>
        </div>
    );

    return (
        <div className='h-screen w-screen flex bg-[#050505] text-white overflow-hidden'>
            
            <aside className={`
                flex flex-col bg-black border-r border-white/5
                fixed inset-0 z-50
                transition-transform duration-300 ease-in-out
                ${showChat ? 'translate-x-0' : '-translate-x-full'}
                md:relative md:translate-x-0 md:w-[380px]
            `}>
                <div className='flex items-center justify-between md:hidden px-4 pt-4'>
                    <span className='text-xs text-zinc-500 uppercase tracking-widest'>Chat</span>
                    <button
                        onClick={() => setShowChat(false)}
                        className='p-2 rounded-xl hover:bg-white/5 text-zinc-400'
                    >
                        <X size={18} />
                    </button>
                </div>
                <HeaderSection title={website.title} />
                <div className='flex-1 overflow-hidden flex flex-col'>
                    <ChatSection 
                     chat={message}          
                     onUpdate={handleUpdate}
                     isLoading={isLoading}
                     />
                </div>
            </aside>

                    {showChat && (
                <div
                    className='fixed inset-0 z-40 bg-black/60 md:hidden'
                    onClick={() => setShowChat(false)}
                />
            )}

            <div className='flex-1 flex flex-col bg-[#0A0A0A]'>
                
                <div className='h-14 px-3 md:px-6 flex justify-between items-center bg-black/40 backdrop-blur-md border-b border-white/5'>
                    <div className='flex items-center gap-3'>
                        <button
                            onClick={() => setShowChat(true)}
                            className='md:hidden p-2 rounded-xl hover:bg-white/5 text-zinc-400 hover:text-white transition-colors'
                        >
                            <MessageSquare size={18} />
                        </button>
                        <div className='w-2 h-2 rounded-full bg-emerald-500 animate-pulse' />
                        <span className='text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold'>Live Engine</span>

                         {userData &&
                        <div className=' flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm
                        cursor-pointer hover:bg-white/10 transition'>
                            <Coins  className='text-yellow-500'/>
                            <span className='text-zinc-300 hidden md:inline'>Credits</span>
                            <span>{userData?.credits} <span className='text-zinc-300'>+</span></span>
                        
                            
                        </div>}
                    </div>

                    

                    <div className='flex items-center gap-2'>
                        <button className='group flex items-center gap-2 px-4 py-2 rounded-full 
                            bg-white text-black text-xs font-bold hover:bg-gradient-to-br from-blue-400 to-yellow-300 transition-all duration-300 active:scale-95'>
                            <Rocket size={14} className="group-hover:-translate-y-0.5 transition-transform" />
                            Deploy
                        </button>
                        
                        <div className='w-[1px] h-4 bg-white/10 mx-1' />

                        <button className='hidden md:flex p-2 rounded-xl hover:bg-white/5 text-zinc-500 hover:text-white transition-colors'>
                        <Code2 size={18} />
                        </button>
                        <button className='hidden md:flex p-2 rounded-xl hover:bg-white/5 text-zinc-500 hover:text-white transition-colors'>
                            <Monitor size={18} />
                        </button>
                        </div>
                </div>

                {/* Preview Container: "The Browser View" */}
                <main className='flex-1 p-2 md:p-4 flex justify-center items-center'>
                    <div className='w-full h-full bg-white rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden border border-white/5'>
                        <iframe 
                            ref={iframeRef} 
                            title="preview"
                            className='w-full h-full border-none'
                        />
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Editor;