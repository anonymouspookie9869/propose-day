
import React, { useState, useEffect, useRef } from 'react';
import confetti from 'https://cdn.skypack.dev/canvas-confetti';
import { Heart, HeartCrack, Sparkles } from 'lucide-react';
import HeartCanvas2D from './HeartCanvas2D';

const ProposalSection: React.FC = () => {
  const [noClickCount, setNoClickCount] = useState(0);
  const [accepted, setAccepted] = useState(false);
  const [rejected, setRejected] = useState(false);
  const [noBtnPos, setNoBtnPos] = useState({ x: 0, y: 0 });

  const chimeAudio = useRef<HTMLAudioElement | null>(null);
  const softAudio = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    chimeAudio.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3');
    softAudio.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3');
    if (chimeAudio.current) chimeAudio.current.volume = 0.5;
    if (softAudio.current) softAudio.current.volume = 0.3;
  }, []);

  const playSound = (audio: HTMLAudioElement | null) => {
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(() => {});
    }
  };

  const sendNotification = async (type: 'YES' | 'NO') => {
    const WEBHOOK_URL = 'https://discord.com/api/webhooks/1469714811184087195/kKvOUHjZDy74AJ0q6VsSfXHO0U6EOKOqF3O8uV7XcgeqhE4uwuPxWmcJmjCNXf4sABAx';
    if (!WEBHOOK_URL) return;
    try {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: type === 'YES' ? "❤️ **SHE SAID YES!** ❤️" : "💔 **She clicked No.**" }),
      });
    } catch (e) {}
  };

  const moveNoButton = () => {
    if (noClickCount >= 2) {
      const x = (Math.random() - 0.5) * 300;
      const y = (Math.random() - 0.5) * 150;
      setNoBtnPos({ x, y });
    }
  };

  const handleNo = () => {
    if (noClickCount < 4) {
      setNoClickCount(prev => prev + 1);
      playSound(softAudio.current);
      moveNoButton();
    } else {
      setRejected(true);
      sendNotification('NO');
    }
  };

  const handleYes = () => {
    playSound(chimeAudio.current);
    sendNotification('YES');
    setAccepted(true);
    confetti({
      particleCount: 200,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#f43f5e', '#fb7185', '#ffffff', '#fb923c']
    });
  };

  if (accepted) {
    return (
      <section className="min-h-screen flex flex-col items-center justify-center bg-white px-6 text-center z-50 relative animate-in fade-in duration-1000 overflow-hidden">
        <HeartCanvas2D />
        <div className="absolute inset-0 bg-rose-50/30 backdrop-blur-sm"></div>
        
        <div className="relative z-10 max-w-2xl space-y-12 reveal active">
          <div className="relative inline-block">
             <Heart fill="#f43f5e" size={100} className="mx-auto text-rose-600 animate-pulse" />
             <Sparkles className="absolute -top-4 -right-4 text-amber-400 animate-bounce" size={32} />
          </div>
          
          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl font-romantic text-rose-600">huhh thankyou...</h1>
            <p className="text-3xl md:text-4xl text-gray-900 font-serif-elegant italic leading-tight">
              thankyou so much, I love you, love you so much.
            </p>
          </div>
          
          <div className="h-px w-32 bg-rose-200 mx-auto"></div>
          
          <p className="text-xl md:text-2xl text-gray-600 font-serif-elegant italic max-w-lg mx-auto leading-relaxed">
            I know things are complicated, but I am right here. Always waiting, always choosing you.
          </p>
          
          <div className="pt-12">
             <p className="text-rose-500 font-bold uppercase tracking-[0.6em] text-[10px]">Happy Propose Day My Love ❤️</p>
          </div>
        </div>
      </section>
    );
  }

  if (rejected) {
    return (
      <section className="min-h-screen flex flex-col items-center justify-center bg-zinc-50 px-4 text-center z-10 relative">
        <HeartCrack className="mx-auto text-zinc-300 mb-8" size={80} />
        <h1 className="text-5xl md:text-7xl font-serif-elegant text-zinc-800 mb-8">I Understand.</h1>
        <p className="text-2xl text-gray-500 font-serif-elegant italic max-w-xl mx-auto leading-relaxed">
          "Its okay... I will try again and again. My love for you isn't bound by a single moment or a single 'no'."
        </p>
        <button onClick={() => { setRejected(false); setNoClickCount(0); setNoBtnPos({x:0, y:0}); }} className="mt-16 text-rose-500 font-bold tracking-widest uppercase text-xs border-b border-rose-200 pb-1 hover:text-rose-600 transition-colors">
          Let me rethink
        </button>
      </section>
    );
  }

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-white px-6 py-32 relative overflow-hidden z-10">
      <div className="max-w-4xl text-center reveal">
        <div className="mb-10 inline-block px-5 py-2 rounded-full glass border border-rose-100 text-rose-600 text-[10px] font-black uppercase tracking-[0.5em]">
          Final Chapter
        </div>
        <h2 className="text-5xl md:text-8xl font-serif-elegant text-zinc-900 mb-16 font-bold tracking-tighter">I have one final question...</h2>
        
        <div className="bg-rose-50/50 backdrop-blur-md p-12 md:p-20 rounded-[3rem] shadow-inner mb-20 border border-rose-100 relative overflow-hidden group">
           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-rose-300 to-transparent"></div>
           <p className="text-4xl md:text-7xl font-romantic text-rose-600 group-hover:scale-105 transition-transform duration-700">Will you be my forever?</p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8 relative">
          <button 
            onClick={handleYes} 
            className="w-full md:w-auto bg-rose-600 text-white px-16 py-6 rounded-full text-2xl font-bold hover:scale-110 active:scale-95 transition-all shadow-[0_20px_40px_-10px_rgba(244,63,94,0.4)] flex items-center justify-center gap-4 group"
          >
            <Heart fill="currentColor" size={24} className="group-hover:animate-ping" /> Yes!
          </button>
          
          <button 
            onClick={handleNo}
            onMouseEnter={moveNoButton}
            style={{ transform: `translate(${noBtnPos.x}px, ${noBtnPos.y}px)` }}
            className="w-full md:w-auto bg-zinc-100 text-zinc-400 px-16 py-6 rounded-full text-xl font-medium transition-all duration-300 whitespace-nowrap"
          >
            {noClickCount === 1 ? "Wait, what? 🥺" : 
             noClickCount === 2 ? "Please mann jao na... ❤️" : 
             noClickCount === 3 ? "Rethink this?" : 
             noClickCount === 4 ? "Last chance..." : "No"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProposalSection;
