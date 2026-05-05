import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { serverUrl } from '../App';
import { useParams } from 'react-router-dom';
import HeaderSection from '../Components/EditorUI/HeaderSection';
import { ChatSection } from '../Components/EditorUI/ChatSection';
import { Code2, Coins, Copy, CopyCheck, MessageSquare, Monitor, Rocket, X } from 'lucide-react';
import { useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'motion/react';
import Editor from '@monaco-editor/react';
import prettier from "prettier/standalone";
import htmlParser from "prettier/plugins/html";
import cssParser from "prettier/plugins/postcss"; 


const WebsiteEditor = () => {
    const { userData } = useSelector(state => state.user);
    const { id } = useParams();
    const [website, setwebsite] = useState(null);
    const [websiteError, setWebsiteError] = useState("");
    const iframeRef = useRef(null);
    const [code, setCode] =useState("")
    const [message, setMessage] =useState([])
    const [isLoading, setIsLoading] = useState(false) 
    const [showChat, setShowChat] = useState(false)
    const [showCode, setShowCode] = useState(false)
    const [showPreview, setShowPreview] = useState(false)
    const previewIframeRef = useRef(null);
    const [copyCode, setCopyCode] = useState(false);

    
    

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
        
        const raw = result.data.code;
         const formatted = await prettier.format(raw, {
        parser: "html",
        plugins: [htmlParser, cssParser],
    });
        
        setCode(formatted);



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
    if (website?.latestCode && !code) {
        prettier.format(website.latestCode, {
            parser: "html",
            plugins: [htmlParser, cssParser],
        }).then(setCode);
    }
}, [website]);

const handleCopyCode = () => {
    if (!code) return;
    navigator.clipboard.writeText(code);
    setCopyCode(true);
    setTimeout(() => setCopyCode(false), 1000);
}

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

    //show full screen preview when showPreview is true
    useEffect(() => {
    if (!showPreview || !previewIframeRef.current) return;
    const latestCode = code || website?.latestCode;
    if (!latestCode) return;
    const blob = new Blob([latestCode], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    previewIframeRef.current.src = url;
    return () => URL.revokeObjectURL(url);
}, [showPreview, code, website?.latestCode]);

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
                        <span className='hidden md:inline-block text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold'>Live Engine</span>

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

                        <button
                        onClick={()=> setShowCode(true)}
                        className='flex p-2 rounded-xl hover:bg-white/5 text-zinc-500 hover:text-white transition-colors'>
                        <Code2 size={18} />
                        </button>
                        <button
                        onClick={()=> setShowPreview(true)}
                        className='flex p-2 rounded-xl hover:bg-white/5 text-zinc-500 hover:text-white transition-colors'>
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
            
            {/* <AnimatePresence>
                {showCode && (
                    <motion.div
                    initial= {{ x: "100%" }}
                    animate= {{ x: 0 }}
                    exit= {{ x: "100%" }}
                    className='fixed inset-y-0 right-0 w-full lg:w-[45%] z-[9999] bg-[#1e1e1e] flex flex-col'
                    >

                            <div className='h-12 px-4 flex justify-between items-center border-b border-white/10 bg-[#1e1e1e]'>
                                <span className='text-sm font-medium'>index.html</span>
                                <div className='flex justify-end items-center gap-4'>
                                <button title='copy code' className='hover:p-2 bg-gray-500/15 rounded-2xl'><Copy size={18}/></button>
                                <button title='close' className='hover:p-2 bg-gray-500/15 rounded-2xl' onClick={() => setShowCode(false)}><X size={15}/></button>
                                </div>
                            </div>
                            <Editor
                            theme='vs-dark'
                            value={code}
                            language='html'
                            onChange={(v) => setCode(v)}
                            />
                    </motion.div>
                )}
            </AnimatePresence> */}
            {/* Remove AnimatePresence entirely, keep Editor always mounted */}
                <motion.div
                    initial={{ x: "100%" }}
                    animate={{ x: showCode ? 0 : "100%" }}
                    transition={{ type: "tween", duration: 0.3 }}
                    className='fixed inset-y-0 right-0 w-full lg:w-[45%] z-[9999] bg-[#1e1e1e] flex flex-col'
                >
                    <div className='h-12 px-4 flex justify-between items-center border-b border-white/10 bg-[#1e1e1e]'>
                        <span className='text-sm font-medium'>index.html</span>
                        <div className='flex justify-end items-center gap-4'>
                            <button
                            onClick={handleCopyCode}
                            title='copy code' className='hover:p-2 bg-gray-500/15 rounded-2xl'>
                                
                                {!copyCode ? (
                                    <Copy size={18}/>
                                ) : (
                                    <CopyCheck size={18}  className='text-green-400 animate-pulse' />
                                )}
                            </button>
                            <button title='close' className='hover:p-2 bg-gray-500/15 rounded-2xl' onClick={() => setShowCode(false)}>
                                <X size={15}/>
                            </button>
                        </div>
                    </div>
                    <Editor
                        theme='vs-dark'
                        value={code}
                        language='html'
                        onChange={(v) => setCode(v)}
                    />
                </motion.div>

           <AnimatePresence>
                {showPreview && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className='fixed inset-0 z-[9999] bg-black'
                    >
                        <iframe
                            ref={previewIframeRef}
                            title="full-screen-preview"
                            sandbox="allow-scripts allow-same-origin allow-forms"
                            className='h-full w-full bg-white border-none'
                        />
                        <button
                            onClick={() => setShowPreview(false)}
                            className='absolute top-4 right-4 p-2 bg-gray-500/15 rounded-2xl'
                        >
                            <X size={15}/>
                        </button>
        </motion.div>
    )}
</AnimatePresence>


        </div>
    );
}

export default WebsiteEditor;