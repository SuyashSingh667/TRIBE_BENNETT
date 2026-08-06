import React from 'react';
import { useNavigate } from 'react-router-dom';

export interface DivisionConfig {
  id: 'technical' | 'cultural' | 'sports';
  title: string;
  subtitle: string;
  description: string;
  accentHex: string;
  accentRgbClasses: string; // e.g. "bg-red-500", "text-red-500"
  metrics: { l: string; v: string; }[];
  gridTitle: string;
  gridSubtitle: string;
  iconFallback: string;
  bgMotionEffect: React.ReactNode;
}

export const DivisionLayoutEngine: React.FC<{ config: DivisionConfig; clubs: any[] }> = ({ config, clubs }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#fdfaf6] min-h-screen text-black font-display relative overflow-hidden">
      
      {/* =========================================================
          COMMAND CENTER HERO
      ========================================================= */}
      <section className="relative pt-24 pb-20 px-8 md:px-16 border-b-[4px] border-black bg-white">
         
         <div className="absolute inset-0 z-0 opacity-10 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]"></div>

         <div className="max-w-[1400px] mx-auto relative z-10 flex flex-col items-center md:items-start text-center md:text-left">
           
           <div className={`flex items-center gap-4 mb-6`}>
             <div className="size-4 bg-[#a1ff00] border-[3px] border-black animate-pulse" />
             <span className="text-[10px] font-black uppercase tracking-[0.4em] px-3 py-1 bg-white border-[3px] border-black shadow-neo-sm text-black">
               Command Center Sync Active
             </span>
           </div>

           <h1 className="text-7xl md:text-[100px] lg:text-[140px] leading-[0.8] font-black tracking-tighter uppercase text-black mb-8 group hover:scale-[1.01] transition-transform duration-700 origin-left drop-shadow-[4px_4px_0_rgba(0,0,0,1)]">
             {config.title}
           </h1>
           
           <p className="text-2xl md:text-3xl font-black text-black uppercase tracking-tight mb-4 flex flex-wrap justify-center md:justify-start gap-3">
              {config.subtitle.split(' ').map((word, i) => {
                const colors = ['bg-[#ffde00]', 'bg-[#ff90e8]', 'bg-[#a1ff00]', 'bg-white'];
                return (
                  <span key={i} className={`${colors[i % colors.length]} text-black px-3 py-1 border-[3px] border-black shadow-neo-sm`}>{word}</span>
                );
              })}
           </p>

           <p className="text-sm font-bold text-gray-700 max-w-xl mb-12 border-l-[4px] border-black pl-4">
             "{config.description}"
           </p>

           {/* Live Division Metrics */}
           <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 w-full border-[4px] border-black rounded-2xl shadow-neo transition-shadow duration-700 overflow-hidden">
              {config.metrics.map((stat, i) => {
                 const statColors = ['bg-[#ffde00]', 'bg-[#ff90e8]', 'bg-[#a1ff00]', 'bg-white'];
                 return (
                   <div key={i} className={`flex flex-col p-6 ${i!==3 ? 'border-r-[4px] border-black' : ''} ${i<2 ? 'border-b-[4px] lg:border-b-0 border-black' : ''} ${statColors[i % statColors.length]} hover:opacity-80 transition-opacity`}>
                      <span className="text-[10px] font-black uppercase tracking-widest text-black mb-2">{stat.l}</span>
                      <span className="text-3xl font-black text-black">{stat.v}</span>
                   </div>
                 );
              })}
           </div>
         </div>
      </section>

      {/* =========================================================
          SQUAD / DIVISION GRID
      ========================================================= */}
      <section className="py-24 px-8 md:px-16 max-w-[1400px] mx-auto relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-4 h-10 border-[3px] border-black bg-black shadow-neo-sm"></div>
              <h2 className="text-4xl lg:text-5xl font-black uppercase tracking-tighter text-black">{config.gridTitle}</h2>
            </div>
            <p className="text-black font-bold max-w-xl text-sm">
              {config.gridSubtitle}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
           {clubs.map((club, i) => {
             return (
               <div 
                 key={i} 
                 onClick={() => navigate(`/clubs/${encodeURIComponent(club.name.toLowerCase().replace(/\s+/g, '-'))}?type=${config.id}`)}
                 className="group relative h-[420px] bg-white rounded-2xl overflow-hidden border-[4px] border-black shadow-neo transition-all duration-300 flex flex-col cursor-pointer hover:-translate-y-2 hover:shadow-neo-hover"
               >
                  <div className="w-full h-1/2 bg-black border-b-[4px] border-black overflow-hidden relative shrink-0">
                    <img src={club.image} alt={club.name} className="w-full h-full object-contain p-4 grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                  </div>
                  
                  <div className="relative z-10 p-6 pt-10 flex flex-col flex-1 pointer-events-none">
                    <div className="size-14 rounded-xl bg-white border-[4px] border-black flex items-center justify-center shadow-neo-sm absolute -top-7 left-6 z-20">
                       <span className="material-symbols-outlined text-black font-black">{club.icon || config.iconFallback}</span>
                    </div>

                    <div>
                      <h3 className="text-2xl font-black text-black uppercase tracking-tighter leading-none mb-2">{club.name}</h3>
                      <p className="text-xs font-bold text-gray-700 line-clamp-3 mb-4">
                        {club.description}
                      </p>
                    </div>
                    
                    <div className="mt-auto flex items-center justify-between pt-4">
                       <span className="text-[10px] font-black tracking-widest uppercase text-black bg-white px-3 py-1 rounded-lg border-[3px] border-black shadow-neo-sm">
                         {club.members || '10+'} Ops
                       </span>
                       <span className="material-symbols-outlined text-black font-black bg-white border-[3px] border-black rounded-lg p-1 shadow-neo-sm group-hover:bg-black group-hover:text-white transition-colors">arrow_forward</span>
                    </div>
                  </div>
               </div>
             );
           })}
        </div>
      </section>
    </div>
  );
};
