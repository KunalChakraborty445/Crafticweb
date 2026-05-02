import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Sparkles, Send } from 'lucide-react';

export const ChatSection = ({ chat = [], onSendMessage, onUpdate, isLoading  }) => {
  const [userInput, setUserInput] = useState("");
  const scrollRef = useRef(null);

  // Logic: Automatically scroll to the latest message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chat]);

  const handleSend = () => {
    if (!userInput.trim()) return;
    // Pass the message up to your Editor component or API handler
    if (onSendMessage) onSendMessage(userInput);
    setUserInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleClickUpdate();  
    }
};

   const handleClickUpdate = () => {
    if (userInput.trim()) {
        onUpdate(userInput);  // ✅ passes the input up correctly
        setUserInput("");
    }
};

  return (
    <div className="flex flex-col h-full bg-black">
      <div 
        ref={scrollRef}
        className='flex-1 overflow-y-auto px-4 py-6 space-y-6 scrollbar-hide'
      >
        <AnimatePresence initial={false}>
          {chat.map((message, index) => (
            <motion.div
              key={message._id || index}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div className={`mt-1 flex-shrink-0 h-7 w-7 rounded-full flex items-center justify-center border ${
                message.role === 'user' ? 'border-white/10 bg-white/5' : 'border-cyan-500/30 bg-cyan-500/10'
              }`}>
                {message.role === 'user' ? <User size={14} className="text-zinc-400" /> : <Sparkles size={14} className="text-cyan-400" />}
              </div>

              <div className={`flex flex-col max-w-[85%] ${message.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`px-4 py-3 rounded-2xl text-[13px] leading-relaxed shadow-sm ${
                  message.role === 'user' ? 'bg-zinc-100 text-black rounded-tr-none' : 'bg-white/[0.03] border border-white/5 text-zinc-200 rounded-tl-none'
                }`}>
                  {message.content}
                </div>
                <span className='text-[10px] mt-1.5 text-zinc-600 font-mono tracking-tighter uppercase'>
                  {message.role === 'user' ? 'You' : 'Craftic AI'}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>


        {isLoading && (
          <div className="flex justify-center py-4">
            <div className="animate-pulse text-zinc-500 text-sm">AI is thinking...</div>
          </div>
        )}
      </div>

      
      <div className='p-4 border-t border-white/5 bg-black'>
        <div className='relative flex items-end gap-2 bg-white/5 border border-white/10 rounded-2xl p-2 focus-within:border-cyan-500/50 transition-all'>
          <textarea
            rows="1"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Describe a change..."
            className='flex-1 bg-transparent border-none focus:outline-none text-sm py-2 px-3 resize-none max-h-32 placeholder:text-zinc-600 overflow-y-auto'
          />
          <button
            onClick={handleClickUpdate}  // ✅ was onClick={handleSend}
            disabled={!userInput.trim()}
            className='p-2 rounded-xl bg-white text-black disabled:bg-zinc-800 disabled:text-zinc-600 hover:bg-cyan-400 transition-all active:scale-95'
          >
            <Send size={16} />
          </button>
        </div>
      </div>

    </div>
  );
};