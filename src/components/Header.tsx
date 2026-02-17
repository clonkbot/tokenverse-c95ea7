import { useState, useEffect } from 'react';

export default function Header() {
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 150);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="relative border-b border-white/5 backdrop-blur-sm bg-[#0a0a0f]/80 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-4 md:py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3 md:gap-4">
            {/* Logo */}
            <div className="relative">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-fuchsia-500 flex items-center justify-center">
                <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="absolute -inset-1 bg-gradient-to-br from-cyan-400 to-fuchsia-500 rounded-xl blur-lg opacity-30 animate-pulse" />
            </div>

            <div>
              <h1 className={`font-orbitron text-xl md:text-2xl font-bold tracking-wider transition-all ${glitchActive ? 'translate-x-[2px] text-fuchsia-400' : ''}`}>
                TOKEN<span className="text-cyan-400">VERSE</span>
              </h1>
              <p className="text-[10px] md:text-xs text-[#606070] font-mono tracking-widest uppercase">
                All Tokens Created
              </p>
            </div>
          </div>

          <nav className="flex items-center gap-2 md:gap-4">
            <button className="px-3 md:px-4 py-2 md:py-2.5 text-xs md:text-sm font-mono text-[#a0a0b0] hover:text-white transition-colors min-h-[44px] flex items-center">
              Explore
            </button>
            <button className="px-3 md:px-4 py-2 md:py-2.5 text-xs md:text-sm font-mono text-[#a0a0b0] hover:text-white transition-colors min-h-[44px] flex items-center">
              Trending
            </button>
            <button className="relative group px-4 md:px-6 py-2 md:py-2.5 text-xs md:text-sm font-mono font-semibold overflow-hidden min-h-[44px] flex items-center">
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-fuchsia-500 transition-transform group-hover:scale-105" />
              <span className="absolute inset-[1px] bg-[#0a0a0f] transition-all group-hover:bg-transparent" />
              <span className="relative text-cyan-400 group-hover:text-white transition-colors">Connect</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Animated line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] overflow-hidden">
        <div className="h-full w-1/3 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-slide" />
      </div>
    </header>
  );
}
