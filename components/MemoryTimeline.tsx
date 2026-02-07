import React from 'react';
import { Star, Camera } from 'lucide-react';
import { Memory } from '../types';

const memories: Memory[] = [
  {
    id: '1',
    date: 'The Unexpected Encounter',
    title: 'Outside the Cinema',
    description: "I was there just to lift your spirit, hoping to fix a bad day. I didn't know then that seeing you in person for the first time would also be the last. Time stopped, and for those minutes, the world was just the reflection in your eyes.",
    image: 'https://raw.githubusercontent.com/anonymouspookie9869/propose-day/main/p1.jpeg',
  },
  {
    id: '2',
    date: 'Our Digital Thread',
    title: 'Shared Reels',
    description: "Those endless scrolls, sharing bits of humor and heart through a screen. Every 'send' was a whispered 'I'm thinking of you.' Even if the chat is quiet now, the reels we shared still echo in my mind.",
    image: 'https://raw.githubusercontent.com/anonymouspookie9869/propose-day/main/p2.jpeg',
  },
  {
    id: '3',
    date: 'The Silent Vow',
    title: 'Choosing You Still',
    description: "Silence is sometimes a choice, and mine is to respect your space. But even in the quietest hours, I find myself choosing you over and over. You aren't just a memory; you are the choice I make every morning.",
    image: 'https://raw.githubusercontent.com/anonymouspookie9869/propose-day/main/p3.jpeg',
  }
];

const MemoryTimeline: React.FC = () => {
  return (
    <section className="py-32 px-4 max-w-5xl mx-auto relative z-10">
      <div className="text-center mb-24 reveal">
        <div className="flex justify-center mb-6">
          <Camera className="text-rose-300" size={32} />
        </div>
        <h2 className="text-5xl md:text-7xl font-serif-elegant text-zinc-900 mb-6 tracking-tight">Gallery of Us</h2>
        <p className="text-zinc-500 italic font-serif-elegant text-xl">"Captured moments of a heart that remembers every detail."</p>
        <div className="w-24 h-0.5 bg-rose-200 mx-auto rounded-full mt-10"></div>
      </div>
      
      <div className="space-y-40">
        {memories.map((memory, index) => (
          <div 
            key={memory.id} 
            className={`flex flex-col md:flex-row items-center gap-16 md:gap-24 reveal ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
          >
            {/* Polaroid Styling */}
            <div className="w-full md:w-[45%] group relative">
              <div 
                className={`relative bg-white p-4 pb-16 shadow-[0_20px_50px_rgba(0,0,0,0.15)] transform transition-all duration-700 group-hover:scale-105 group-hover:-rotate-2 group-hover:shadow-[0_30px_60px_rgba(225,29,72,0.1)] ${index % 2 === 0 ? '-rotate-1' : 'rotate-1'}`}
              >
                {/* Washi Tape Detail */}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-24 h-8 bg-rose-100/40 backdrop-blur-sm rotate-2 z-20 border border-white/20"></div>
                
                <div className="overflow-hidden relative polaroid-shine">
                  <img 
                    src={memory.image} 
                    alt={memory.title} 
                    className="w-full aspect-[4/5] object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-1000 ease-in-out"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-${index === 0 ? '1517604931442-7e0c8ed2963c' : index === 1 ? '1516733725897-1aa73b87c8e8' : '1490730141103-6cac27aaab94'}?auto=format&fit=crop&q=80&w=800`;
                    }}
                  />
                </div>
                
                <div className="absolute bottom-5 left-8 right-8 text-center">
                   <span className="font-romantic text-2xl text-zinc-400 group-hover:text-rose-400 transition-colors">Frame {index + 1}</span>
                </div>
              </div>
              {index === 0 && <Star className="absolute -top-8 -right-8 text-amber-300 fill-amber-300 animate-pulse drop-shadow-lg" size={40} />}
            </div>

            <div className="w-full md:w-1/2 text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-rose-50 text-rose-600 px-5 py-1.5 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase mb-8 border border-rose-100">
                {memory.date}
              </div>
              <h3 className="text-4xl md:text-5xl font-serif-elegant text-zinc-800 mb-8 leading-tight">{memory.title}</h3>
              <p className="text-zinc-600 leading-relaxed text-xl italic font-serif-elegant opacity-80 border-l-4 border-rose-50 pl-8 ml-2">
                "{memory.description}"
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MemoryTimeline;