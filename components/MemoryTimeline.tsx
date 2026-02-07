
import React from 'react';
import { Star, Camera } from 'lucide-react';
import { Memory } from '../types';

const memories: Memory[] = [
  {
    id: '1',
    date: 'Chapter I: The Intersection',
    title: 'Outside the Cinema',
    description: 'I went there just to surprise you, hoping to fix your mood. I didn\'t know then that it would be our first time seeing each other... and the last. I stood there, words failing me, as I just drowned in your eyes.',
    image: 'p1.jpeg',
  },
  {
    id: '2',
    date: 'Chapter II: The Echo',
    title: 'Reels & Reality',
    description: 'The days we spent sharing our worlds through a screen. Every reel shared was a way of saying "I\'m thinking of you." Those hours of talking feel like a lifetime ago now.',
    image: 'p2.jpeg',
  },
  {
    id: '3',
    date: 'Chapter III: The Choice',
    title: 'The Silent Vow',
    description: 'Even in this silence, where I choose not to message you, the choice remains the same. I chose you then outside the theater, and I choose you now in the quiet.',
    image: 'p3.jpeg',
  }
];

const MemoryTimeline: React.FC = () => {
  return (
    <section className="py-32 px-4 max-w-6xl mx-auto relative z-10 overflow-hidden">
      <div className="text-center mb-32 reveal">
        <h2 className="text-5xl md:text-7xl font-serif-elegant text-zinc-900 mb-6 font-bold tracking-tight">Our Story <span className="text-rose-500 italic">In Frames</span></h2>
        <p className="text-zinc-400 uppercase tracking-[0.5em] text-[10px] font-bold">A journey of a thousand unspoken words</p>
        <div className="w-16 h-1 bg-rose-500 mx-auto rounded-full mt-10"></div>
      </div>
      
      <div className="relative">
        {/* The Thread of Time */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-zinc-100 -translate-x-1/2 hidden md:block"></div>
        
        <div className="space-y-48">
          {memories.map((memory, index) => (
            <div 
              key={memory.id} 
              className={`flex flex-col md:flex-row items-center gap-16 md:gap-24 reveal ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
            >
              {/* Image Side */}
              <div className="w-full md:w-1/2 group relative">
                <div className="relative overflow-hidden rounded-2xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)] transform transition duration-1000 group-hover:scale-[1.02]">
                  <img 
                    src={memory.image} 
                    alt={memory.title} 
                    className="w-full h-[450px] object-cover transition-transform duration-1000 group-hover:scale-110"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-${index === 0 ? '1517604931442-7e0c8ed2963c' : index === 1 ? '1516733725897-1aa73b87c8e8' : '1490730141103-6cac27aaab94'}?auto=format&fit=crop&q=80&w=800`;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                     <span className="text-white font-romantic text-2xl tracking-wide">{memory.title}</span>
                  </div>
                </div>
                
                {/* Visual marker on timeline */}
                <div className={`absolute top-1/2 -translate-y-1/2 hidden md:flex items-center justify-center w-10 h-10 rounded-full glass border border-rose-200 z-10 
                  ${index % 2 === 0 ? '-right-[68px]' : '-left-[68px]'}`}>
                   <div className="w-3 h-3 bg-rose-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(244,63,94,0.6)]"></div>
                </div>
              </div>

              {/* Text Side */}
              <div className="w-full md:w-1/2 text-center md:text-left space-y-6">
                <div className="text-rose-500 font-bold text-[10px] uppercase tracking-[0.4em] mb-2 inline-block px-3 py-1 bg-rose-50 rounded-lg">
                  {memory.date}
                </div>
                <h3 className="text-4xl font-serif-elegant text-zinc-900 font-bold leading-tight">{memory.title}</h3>
                <p className="text-zinc-500 leading-relaxed text-xl italic font-light font-serif-elegant border-l-4 border-rose-100 pl-8 py-2">
                  "{memory.description}"
                </p>
                <div className="flex items-center gap-3 text-zinc-300 group-hover:text-rose-400 transition-colors justify-center md:justify-start">
                   <Camera size={18} />
                   <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Stored in Eternal Memory</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MemoryTimeline;
