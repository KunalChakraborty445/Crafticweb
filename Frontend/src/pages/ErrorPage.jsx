import React, { useEffect, useState } from 'react';

const glitch1 = `
@keyframes glitch1 {
  0%,100% { clip-path: inset(0 0 95% 0); transform: translateX(0); }
  20%      { clip-path: inset(30% 0 50% 0); transform: translateX(-4px); }
  40%      { clip-path: inset(60% 0 20% 0); transform: translateX(4px); }
  60%      { clip-path: inset(80% 0 5% 0);  transform: translateX(-2px); }
  80%      { clip-path: inset(10% 0 75% 0); transform: translateX(2px); }
}
@keyframes glitch2 {
  0%,100% { clip-path: inset(0 0 95% 0); transform: translateX(0); }
  20%     { clip-path: inset(50% 0 30% 0); transform: translateX(4px); }
  40%     { clip-path: inset(15% 0 65% 0); transform: translateX(-4px); }
  60%     { clip-path: inset(70% 0 10% 0); transform: translateX(2px); }
  80%     { clip-path: inset(40% 0 40% 0); transform: translateX(-2px); }
}
@keyframes float {
  0%,100% { transform: translateY(0); }
  50%     { transform: translateY(-10px); }
}
@keyframes scanline {
  0%   { transform: translateY(-100%); }
  100% { transform: translateY(500%); }
}
@keyframes blink {
  0%,49%,100% { opacity: 1; }
  50%,99%     { opacity: 0; }
}
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}
`;

export default function ErrorPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const style = document.createElement('style');
    style.textContent = glitch1;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-[#08080c] overflow-hidden px-6 text-center">

      <div
        className="absolute left-0 right-0 h-16 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.015), transparent)',
          animation: 'scanline 3s linear infinite',
        }}
      />

      <div
        className="mb-6 text-white/30"
        style={{ animation: 'float 3s ease-in-out infinite' }}
      >
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <line x1="9" y1="13" x2="15" y2="13"/>
          <line x1="9" y1="17" x2="11" y2="17"/>
          <line x1="14" y1="17" x2="15.5" y2="15.5"/>
          <line x1="14" y1="13" x2="15.5" y2="14.5"/>
        </svg>
      </div>

      <div
        className="relative mb-3"
        style={{ opacity: mounted ? 1 : 0, animation: mounted ? 'fadeUp 0.4s ease both' : 'none' }}
      >
        <span
          aria-hidden="true"
          className="absolute inset-0 text-[96px] font-medium tracking-[-4px] leading-none text-red-500 select-none"
          style={{ animation: 'glitch1 4s steps(1) infinite' }}
        >404</span>
        <span
          aria-hidden="true"
          className="absolute inset-0 text-[96px] font-medium tracking-[-4px] leading-none text-blue-400 select-none"
          style={{ animation: 'glitch2 4s steps(1) infinite', animationDelay: '0.15s' }}
        >404</span>
        <span className="relative text-[96px] font-medium tracking-[-4px] leading-none text-white">
          404
        </span>
      </div>

      <p
        className="text-lg font-medium text-white mb-2"
        style={{ animation: 'fadeUp 0.5s ease 0.1s both' }}
      >
        Page not found
        <span style={{ animation: 'blink 1s step-end infinite' }}>_</span>
      </p>

      <p
        className="text-sm text-white/40 max-w-xs leading-relaxed mb-10"
        style={{ animation: 'fadeUp 0.5s ease 0.2s both' }}
      >
        The page you're looking for doesn't exist or has been moved somewhere else.
      </p>

      <div
        className="flex gap-3 flex-wrap justify-center"
        style={{ animation: 'fadeUp 0.5s ease 0.3s both' }}
      >
        <button
          onClick={() => window.history.back()}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          Go home
        </button>
        
      </div>

      
    </div>
  );
}