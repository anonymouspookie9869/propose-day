import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Heart, HeartCrack, Sparkles } from 'lucide-react';
import HeartCanvas2D from './HeartCanvas2D.tsx';

const ProposalSection: React.FC = () => {
  const [noCount, setNoCount] = useState(0);
  const [status, setStatus] = useState<'IDLE' | 'YES' | 'NO'>('IDLE');
  const [isShaking, setIsShaking] = useState(false);

  const noPhrases = [
    "No",
    "are you sure? 🥺",
    "please mann jao na 🙏"
  ];

  const sendNotification = async (type: 'YES' | 'NO') => {
    const WEBHOOK = 'https://discord.com/api/webhooks/1469714811184087195/kKvOUHjZDy74AJ0q6VsSfXHO0U6EOKOqF3O8uV7XcgeqhE4uwuPxWmcJmjCNXf4sABAx';
    try {
      await fetch(WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          content: type === 'YES' ? "💍 **SHE SAID YES!** ❤️" : "💔 **She said No.** Choice respected." 
        }),
      });
    } catch (e) { console.error(e); }
  };

  const handleYes = () => {
    setStatus('YES');
    sendNotification('YES');
    confetti({
      particleCount: 200,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#fb7185', '#e11d48', '#ffffff', '#ffd7e0']
    });
  };

  const handleNo = () => {
    setIsShaking(true);
    if (noCount < noPhrases.length - 1) {
      setNoCount(noCount + 1);
    } else {
      setStatus('NO');
      sendNotification('NO');
    }
    // Reset shake after animation completes
    setTimeout(() => setIsShaking(false), 400);
  };

  if (status === 'YES') {
    return (
      <section className="h-screen flex flex-col items-center justify-center bg-rose-50 text-center px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(251,113,133,0.15)_0%,transparent_70%)]"></div>
        {/* This is the same heart animation as before, now restored to high density */}
        <HeartCanvas2D />
        <div className="relative z-10 animate-in fade-in zoom-in duration-1000 max-w-4xl">
          <div className="flex justify-center gap-4 mb-8">
            <Sparkles size={40} className="text-amber-400 animate-pulse" />
            <Heart size={80} className="text-rose-600 animate-bounce" fill="currentColor" />
            <Sparkles size={40} className="text-amber-400 animate-pulse" />
          </div>
          <h2 className="text-5xl md:text-7xl font-romantic text-rose-600 mb-8 drop-shadow-lg">My World. ❤️</h2>
          <p className="text-2xl md:text-3xl font-serif-elegant italic text-zinc-800 leading-relaxed px-4">
            "huhh thankyou , thankyou so much , I love you , love you so much , I know you are confused and not ready for relationship but I am here always waiting for you"
          </p>
          <div className="mt-16 inline-block px-10 py-4 rounded-full border border-rose-200 text-rose-400 font-bold uppercase tracking-[0.5em] text-sm animate-pulse">
            Forever Starts Now
          </div>
        </div>
      </section>
    );
  }

  if (status === 'NO') {
    return (
      <section className="h-screen flex flex-col items-center justify-center bg-zinc-950 text-center px-6 text-white relative">
        <HeartCrack size={100} className="mx-auto text-zinc-700 mb-10" />
        <h2 className="text-4xl md:text-6xl font-serif-elegant mb-8 text-rose-100 italic">Always Here.</h2>
        <p className="text-xl md:text-3xl italic text-zinc-400 font-serif-elegant max-w-4xl leading-relaxed">
          "its okay I will try again and again , love you in silence and in crowd both"
        </p>
        <button 
            onClick={() => { setNoCount(0); setStatus('IDLE'); }} 
            className="mt-16 px-8 py-3 rounded-full border border-rose-500/20 text-rose-500/60 hover:text-rose-500 hover:border-rose-500 hover:bg-rose-500/5 transition-all cursor-pointer font-medium tracking-wide"
        >
          I changed my mind
        </button>
      </section>
    );
  }

  const yesScale = 1 + (noCount * 0.25);

  return (
    <section className="py-48 px-6 flex flex-col items-center justify-center text-center bg-white relative z-10 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-rose-50/50 rounded-full blur-[120px] -z-10"></div>
      
      <div className="reveal active">
        <div className="flex justify-center mb-10">
          <div className="p-4 bg-rose-50 rounded-full animate-pulse">
             <Heart className="text-rose-500" size={32} fill="currentColor" />
          </div>
        </div>
        
        <h2 className="text-5xl md:text-7xl font-serif-elegant text-zinc-900 mb-16 tracking-tight">The Question</h2>
        
        <div className="relative mb-24 max-w-5xl mx-auto group">
           <div className="p-12 md:p-20 rounded-[3rem] md:rounded-[4rem] bg-rose-50/30 border-2 border-rose-100/50 backdrop-blur-sm shadow-[0_40px_100px_rgba(251,113,133,0.1)] relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-transparent via-rose-300 to-transparent"></div>
              <p className="text-3xl md:text-5xl font-romantic text-rose-600 leading-tight">
                In every frame of my life, from the first time I saw you till the very last... <br className="hidden md:block"/> will you be mine?
              </p>
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-rose-200/20 rounded-tl-full"></div>
           </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8 min-h-[150px] w-full max-w-md mx-auto md:max-w-none">
          <button 
            onClick={handleYes}
            style={{ transform: `scale(${yesScale})` }}
            className="w-full md:w-auto px-16 py-7 bg-rose-600 text-white rounded-full text-2xl md:text-4xl font-bold transition-all duration-500 shadow-[0_20px_50px_rgba(225,29,72,0.3)] hover:bg-rose-500 hover:scale-[1.08] hover:shadow-[0_25px_60px_rgba(225,29,72,0.5)] hover:brightness-110 active:scale-95 group relative overflow-hidden"
          >
            <span className="relative z-10 flex items-center justify-center gap-3">
               YES ❤️
            </span>
            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </button>
          
          <button 
            onClick={handleNo}
            className={`w-full md:w-auto px-12 py-5 bg-zinc-100 text-zinc-400 rounded-full text-xl font-medium transition-all duration-300 hover:bg-zinc-200 hover:text-zinc-600 hover:shadow-[0_10px_30px_rgba(0,0,0,0.05)] active:scale-95 relative overflow-hidden ${isShaking ? 'animate-shake' : ''}`}
            style={{ 
                opacity: Math.max(0.4, 1 - noCount * 0.1)
            }}
          >
            <span 
              key={noCount} 
              className="inline-block animate-in fade-in zoom-in duration-300"
            >
              {noPhrases[noCount]}
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProposalSection;