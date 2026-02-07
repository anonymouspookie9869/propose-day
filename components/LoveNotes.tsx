
import React from 'react';
import { Sparkles, Heart, Anchor, Feather } from 'lucide-react';
import { LoveNote } from '../types';

const personalNotes: LoveNote[] = [
  {
    id: '1',
    title: "The Impulse",
    content: "Your mood was off, and I couldn't stand the thought of you being unhappy. I went to that theater just to see you smile. I didn't know it would be the first and last time I'd get to see that smile in person."
  },
  {
    id: '2',
    title: "Eye Contact",
    content: "I had a script in my head, things I wanted to tell you. But when you stepped out and our eyes met, I simply forgot how to speak. I drowned in your eyes, and I've never really wanted to reach the surface."
  },
  {
    id: '3',
    title: "My Truth",
    content: "You say you don't love me, and I respect your truth. But my truth is that I choose you. I choose the girl from the theater, the girl who shares reels, and the girl I'm currently giving silence to. Always."
  }
];

const LoveNotes: React.FC = () => {
  return (
    <section className="py-40 px-6 bg-zinc-50 z-10 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-24 reveal">
          <h2 className="text-5xl md:text-6xl font-romantic text-zinc-800 mb-4 tracking-tight">Unsent Fragments</h2>
          <p className="text-zinc-400 font-serif-elegant italic tracking-widest uppercase text-xs">A heart that persists in the quiet</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {personalNotes.map((note, index) => (
            <div 
              key={note.id} 
              className="reveal bg-white p-12 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-zinc-100 transform transition-all duration-700 hover:-translate-y-4 hover:shadow-2xl group flex flex-col justify-between"
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div>
                <div className="mb-10 text-rose-500/20 group-hover:text-rose-500 transition-colors duration-500">
                  {index === 0 ? <Sparkles size={40} /> : index === 1 ? <Feather size={40} /> : <Anchor size={40} />}
                </div>
                <h3 className="text-[10px] font-black text-zinc-300 mb-8 tracking-[0.4em] uppercase">
                  Fragment 0{index + 1}
                </h3>
                <p className="text-gray-600 leading-[1.8] font-serif-elegant italic text-xl">
                  "{note.content}"
                </p>
              </div>
              
              <div className="mt-12 pt-8 border-t border-zinc-50 flex items-center justify-between">
                <Heart size={16} className="text-rose-100 group-hover:text-rose-400 transition-colors" />
                <span className="font-romantic text-2xl text-rose-500/60 group-hover:text-rose-500 transition-colors">{note.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LoveNotes;
