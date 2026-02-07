import React from 'react';
import { Sparkles, History, Heart, MailOpen } from 'lucide-react';
import { LoveNote } from '../types';

const personalNotes: LoveNote[] = [
  {
    id: '1',
    title: "The Silent Surprise",
    content: "When I heard you weren't having a good day, I didn't think twice. I just wanted to see you smile. That walk to the theater was fueled by a simple hope of making your day better. I never expected it to be the start of a story I'd keep writing in my heart every day since."
  },
  {
    id: '2',
    title: "Those Eyes...",
    content: "I had so many words prepared, but the moment I saw you, the world went mute. All I could do was look into your eyes. It was like seeing a whole universe I never knew existed. I'm still caught in that orbit, honestly."
  },
  {
    id: '3',
    title: "Always You",
    content: "People ask why I don't just move on. But they don't know the peace I find in just choosing you, even if from a distance. You're not a habit; you're the standard. I choose the theater girl, the reel girl, and the girl I love silently."
  }
];

const LoveNotes: React.FC = () => {
  return (
    <section className="py-32 px-4 bg-zinc-50 z-10 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20 reveal">
          <div className="flex justify-center mb-6">
             <MailOpen className="text-rose-300" size={30} />
          </div>
          <h2 className="text-5xl md:text-6xl font-romantic text-zinc-900 mb-6">Unopened Letters</h2>
          <p className="text-zinc-400 font-serif-elegant italic text-xl">"The things I say when the screen is dark."</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {personalNotes.map((note, index) => (
            <div 
              key={note.id} 
              className="group perspective-1000 h-[450px]"
            >
              <div className="relative w-full h-full transition-all duration-700 transform-style-3d group-hover:rotate-y-12">
                {/* Envelope Back */}
                <div className="absolute inset-0 bg-white rounded-3xl shadow-2xl border border-zinc-100 p-8 flex flex-col justify-between overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-rose-50 rounded-bl-full -mr-16 -mt-16 opacity-50 transition-all group-hover:scale-125"></div>
                  
                  <div className="relative z-10">
                    <div className="mb-6 text-rose-500 transform transition-transform group-hover:scale-110 group-hover:rotate-12 duration-500">
                      {index === 0 ? <Sparkles size={36} /> : index === 1 ? <History size={36} /> : <Heart size={36} />}
                    </div>
                    
                    <h3 className="text-[10px] font-bold text-rose-300 mb-8 tracking-[0.4em] uppercase">
                      Fragment No. 0{index + 1}
                    </h3>
                    
                    <div className="relative">
                       {/* The Letter that slides up */}
                       <div className="text-gray-700 leading-relaxed font-serif-elegant italic text-lg lg:text-xl border-l-2 border-rose-200 pl-6 transform transition-all duration-500 group-hover:-translate-y-2">
                         "{note.content}"
                       </div>
                    </div>
                  </div>
                  
                  <div className="relative z-10 mt-8 pt-6 border-t border-rose-50 text-right">
                    <span className="font-romantic text-2xl text-rose-500/60 group-hover:text-rose-600 transition-colors">{note.title}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LoveNotes;