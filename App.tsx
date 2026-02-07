import React, { useEffect, useState, useRef, useMemo } from 'react';
import { Heart, ChevronDown, Volume2, VolumeX, Sparkles, AlertCircle } from 'lucide-react';
import FloatingHearts from './components/FloatingHearts.tsx';
import MemoryTimeline from './components/MemoryTimeline.tsx';
import LoveNotes from './components/LoveNotes.tsx';
import ProposalSection from './components/ProposalSection.tsx';
import HeartCanvasWebGL from './components/HeartCanvasWebGL.tsx';

const App: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [hasAudioError, setHasAudioError] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);

      const reveals = document.querySelectorAll('.reveal');
      reveals.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 50) el.classList.add('active');
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setAudioProgress((audio.currentTime / audio.duration) * 100);
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onError = () => setHasAudioError(true);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('error', onError);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('error', onError);
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) audioRef.current.pause();
    else audioRef.current.play().catch(() => {});
  };

  const stars = useMemo(() => {
    return Array.from({ length: 100 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 2 + 1}px`,
      duration: `${Math.random() * 3 + 2}s`,
      delay: `${Math.random() * 5}s`,
      depth: Math.random() * 0.7 + 0.1
    }));
  }, []);

  return (
    <div className="relative min-h-screen bg-black overflow-hidden selection:bg-rose-500/30">
      <audio ref={audioRef} src="https://raw.githubusercontent.com/anonymouspookie9869/propose-day/main/music.mp3" loop />

      {/* Cinematic Vignette */}
      <div className="fixed inset-0 pointer-events-none z-[250] bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]"></div>

      {/* Top Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-[400] bg-white/5">
        <div 
          className="h-full bg-gradient-to-r from-rose-400 to-rose-600 transition-all duration-300 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating Music UI */}
      <div className="fixed bottom-8 right-8 z-[350]">
        <button 
          onClick={toggleMusic}
          className="relative group p-5 glass rounded-full hover:scale-110 transition-all active:scale-95 text-rose-400 shadow-[0_0_20px_rgba(225,29,72,0.2)]"
        >
          {hasAudioError ? <AlertCircle size={22} className="text-amber-500" /> : isPlaying ? <Volume2 size={22} /> : <VolumeX size={22} className="opacity-40" />}
          {isPlaying && (
            <svg className="absolute inset-0 -rotate-90 w-full h-full p-1.5 pointer-events-none" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="264" strokeDashoffset={264 - (264 * audioProgress) / 100} className="transition-all duration-300" />
            </svg>
          )}
        </button>
      </div>

      <FloatingHearts />

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <HeartCanvasWebGL />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black"></div>
          
          {/* Parallax Stars */}
          {stars.map(star => (
            <div 
              key={star.id}
              className="star"
              style={{
                top: star.top,
                left: star.left,
                width: star.size,
                height: star.size,
                '--duration': star.duration,
                '--delay': star.delay,
                transform: `translate(${mousePos.x * star.depth}px, ${mousePos.y * star.depth}px)`
              } as any}
            />
          ))}
        </div>

        <div 
          className="relative z-10 transition-transform duration-500 ease-out"
          style={{ transform: `translate(${mousePos.x * -0.15}px, ${mousePos.y * -0.15}px)` }}
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass text-rose-300 text-[11px] font-medium uppercase tracking-[0.5em] mb-10 animate-pulse border border-rose-500/20 shadow-lg shadow-rose-900/20">
            <Sparkles size={14} /> Our Cinematic Story
          </div>
          <h1 className="text-7xl md:text-[11rem] font-romantic text-white mb-6 drop-shadow-[0_15px_45px_rgba(225,29,72,0.4)] tracking-tight leading-none">
            First & Last Frame
          </h1>
          <p className="text-xl md:text-3xl text-rose-100/70 font-serif-elegant italic max-w-3xl mx-auto leading-relaxed px-4">
            "I came for a surprise, hoping to find a smile... but I found a reason to stay in your eyes forever."
          </p>
        </div>

        <button 
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          className="absolute bottom-16 z-20 animate-bounce text-white/30 hover:text-rose-400 transition-colors flex flex-col items-center gap-3"
        >
          <span className="text-[10px] uppercase tracking-[0.4em] font-light">Scroll into our world</span>
          <ChevronDown size={28} />
        </button>
      </section>

      <main className="relative bg-white text-black">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black to-transparent pointer-events-none"></div>
        
        <MemoryTimeline />
        
        {/* Transitional Quote */}
        <div className="py-48 bg-zinc-950 text-white overflow-hidden relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-rose-500/50 to-transparent"></div>
          <div className="max-w-4xl mx-auto px-8 text-center reveal">
            <Heart size={40} className="mx-auto text-rose-500 mb-14 animate-pulse" fill="currentColor" />
            <p className="text-4xl md:text-6xl font-serif-elegant italic leading-tight text-rose-50">
              "If that one meeting was all the universe intended for us, I would choose to live that hour on a loop forever."
            </p>
            <div className="mt-16 w-20 h-0.5 bg-rose-500/20 mx-auto"></div>
          </div>
        </div>

        <LoveNotes />
        <ProposalSection />
      </main>

      <footer className="py-24 bg-zinc-50 border-t border-zinc-100 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cardboard-flat.png')]"></div>
        <p className="font-romantic text-5xl text-rose-500 mb-6 drop-shadow-sm">Forever & Always</p>
        <p className="text-zinc-400 text-[11px] uppercase tracking-[0.7em] font-medium">A choice made in every frame</p>
      </footer>
    </div>
  );
};

export default App;