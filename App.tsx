
import React, { useEffect, useState, useMemo, useRef } from 'react';
import { Heart, ChevronDown, Camera, Volume2, VolumeX, AlertCircle, Sparkles } from 'lucide-react';
import FloatingHearts from './components/FloatingHearts';
import MemoryTimeline from './components/MemoryTimeline';
import ProposalSection from './components/ProposalSection';
import LoveNotes from './components/LoveNotes';
import HeartCanvasWebGL from './components/HeartCanvasWebGL';

const App: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [hasAudioError, setHasAudioError] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.scrollY / totalScroll) * 100;
      setScrollProgress(currentProgress);
      
      // Reveal observer logic
      const reveals = document.querySelectorAll('.reveal');
      reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const revealTop = reveal.getBoundingClientRect().top;
        const revealPoint = 100;
        if (revealTop < windowHeight - revealPoint) {
          reveal.classList.add('active');
        }
      });
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const updateProgress = () => {
      if (audio.duration && isFinite(audio.duration)) {
        setAudioProgress((audio.currentTime / audio.duration) * 100);
      }
    };
    const onPlay = () => { setIsPlaying(true); setHasAudioError(false); };
    const onPause = () => setIsPlaying(false);
    const onEnded = () => { setIsPlaying(false); setAudioProgress(0); };
    const onError = () => { setHasAudioError(true); setIsPlaying(false); };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('error', onError);
    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('error', onError);
    };
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) audioRef.current.pause();
      else audioRef.current.play().catch(() => {});
    }
  };

  const scrollToNext = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
    if (!isPlaying && audioRef.current && !hasAudioError) {
      audioRef.current.play().catch(() => {});
    }
  };

  const stars = useMemo(() => {
    return Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      duration: `${2 + Math.random() * 5}s`,
      size: Math.random() < 0.7 ? '1px' : '2px',
    }));
  }, []);

  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (audioProgress / 100) * circumference;

  return (
    <div className="relative min-h-screen selection:bg-rose-100 bg-white">
      <audio ref={audioRef} src="music.mp3" loop preload="auto" />
      
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-[110] bg-zinc-100">
        <div 
          className="h-full bg-gradient-to-r from-rose-400 to-rose-600 transition-all duration-300 ease-out" 
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
      
      {/* Premium Music Control */}
      <div className="fixed bottom-8 right-8 z-[100] group">
        <button 
          onClick={toggleMusic}
          className={`relative p-5 glass rounded-full shadow-2xl transition-all duration-500 hover:scale-110 active:scale-90 flex items-center justify-center
            ${hasAudioError ? 'text-amber-500' : 'text-rose-500'}`}
        >
          {!hasAudioError && (
            <svg className="absolute inset-0 -rotate-90 w-full h-full p-1" viewBox="0 0 60 60">
              <circle className="text-rose-100/30" strokeWidth="2" stroke="currentColor" fill="transparent" r={radius} cx="30" cy="30" />
              <circle className="text-rose-500 transition-all duration-300 ease-linear" strokeWidth="2" strokeDasharray={circumference} style={{ strokeDashoffset }} strokeLinecap="round" stroke="currentColor" fill="transparent" r={radius} cx="30" cy="30" />
            </svg>
          )}
          <div className="relative z-10">
            {hasAudioError ? <AlertCircle size={22} /> : isPlaying ? (
              <div className="flex items-end gap-[3px] h-4 px-1">
                <span className="w-1 bg-rose-500 animate-[bounce_0.8s_infinite_0s] origin-bottom" style={{ height: '60%' }}></span>
                <span className="w-1 bg-rose-400 animate-[bounce_0.8s_infinite_0.2s] origin-bottom" style={{ height: '100%' }}></span>
                <span className="w-1 bg-rose-600 animate-[bounce_0.8s_infinite_0.4s] origin-bottom" style={{ height: '40%' }}></span>
              </div>
            ) : <VolumeX size={22} className="opacity-40" />}
          </div>
        </button>
      </div>

      <FloatingHearts />
      
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden z-10 bg-[#0a0505]">
        <div className="absolute inset-0 z-0">
          <HeartCanvasWebGL />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/80"></div>
          <div className="absolute inset-0 pointer-events-none">
            {stars.map((star) => (
              <div key={star.id} className="absolute bg-white rounded-full animate-twinkle" style={{ top: star.top, left: star.left, width: star.size, height: star.size, '--delay': star.delay, '--duration': star.duration } as any} />
            ))}
          </div>
        </div>
        
        <div className="relative z-10 space-y-8 max-w-5xl px-6">
          <div className="flex justify-center mb-4">
             <div className="px-4 py-1.5 rounded-full border border-white/20 glass text-white/70 text-[10px] uppercase tracking-[0.5em] font-medium flex items-center gap-2">
                <Sparkles size={12} className="text-rose-400" />
                A Cinematic Journey
             </div>
          </div>
          <h1 className="text-7xl md:text-[10rem] font-romantic text-white mb-6 drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] leading-tight">
            Our First <span className="text-rose-400">&</span> Last Frame
          </h1>
          <p className="text-lg md:text-2xl text-rose-100/80 font-serif-elegant max-w-2xl mx-auto italic font-light tracking-wide leading-relaxed">
            "I went there just to see your smile, but I ended up finding a piece of my soul I didn't know was missing."
          </p>
        </div>

        <button 
          onClick={scrollToNext}
          className={`absolute bottom-16 z-20 transition-all duration-1000 ${scrollProgress > 5 ? 'opacity-0 scale-90' : 'opacity-100 animate-bounce'}`}
        >
          <div className="flex flex-col items-center gap-3">
            <span className="text-white/40 text-[9px] uppercase tracking-[0.6em] font-semibold">Begin The Story</span>
            <ChevronDown size={24} className="text-rose-400" />
          </div>
        </button>
      </section>

      <main className="relative bg-white">
        <MemoryTimeline />
        
        <div className="py-48 text-center z-10 relative bg-[#0a0505] text-white overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent opacity-10"></div>
          <div className="max-w-4xl mx-auto px-8 relative z-10 reveal">
             <Heart className="mx-auto text-rose-500 mb-12 animate-pulse" size={48} fill="currentColor" />
             <p className="text-4xl md:text-6xl font-serif-elegant italic leading-[1.3] mb-12 tracking-tight">
               "If that one meeting was all the universe had for us, I'd live that hour on loop forever."
             </p>
             <div className="flex flex-col items-center gap-6">
                <div className="h-px w-32 bg-gradient-to-r from-transparent via-rose-500 to-transparent"></div>
                <span className="font-romantic text-4xl text-rose-400">Yours, Always.</span>
             </div>
          </div>
        </div>

        <LoveNotes />
        <ProposalSection />
      </main>

      <footer className="py-24 bg-zinc-50 text-center relative z-10">
        <div className="max-w-xs mx-auto mb-10 h-px bg-rose-100"></div>
        <p className="text-rose-500 font-romantic text-4xl mb-4 tracking-tighter">Forever & Always</p>
        <p className="text-zinc-400 text-[10px] uppercase tracking-[0.4em] font-bold">Crafted with a heart that still waits</p>
      </footer>
    </div>
  );
};

export default App;
