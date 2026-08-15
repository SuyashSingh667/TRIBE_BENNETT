import React from 'react';

interface ClubExplorePanelProps {
  clubName: string;
  originType: string;
  title: string;
  projects: any[];
  onClose: () => void;
}

export const ClubExplorePanel: React.FC<ClubExplorePanelProps> = ({ clubName, originType: _originType, title, projects, onClose }) => {
  return (
    <div className="fixed inset-0 z-[600] flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm animate-in fade-in duration-500" 
        onClick={onClose}
      />
      
      {/* Sliding Panel */}
      <div className="relative w-full max-w-[600px] h-full bg-card border-l border-border shadow-[-50px_0_100px_rgba(0,0,0,0.8)] flex flex-col animate-in slide-in-from-right duration-500 overflow-hidden">
        
        {/* Header */}
        <div className="p-8 md:p-10 border-b border-border bg-background relative z-10 shrink-0 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="size-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">{clubName} Directory</span>
            </div>
            <h2 className="text-3xl font-semibold text-foreground uppercase tracking-tighter">{title}</h2>
          </div>
          <button onClick={onClose} className="size-10 shrink-0 rounded-full bg-[#1a1a1a] hover:bg-white text-muted-foreground hover:text-black border border-border flex items-center justify-center transition-all group">
            <span className="material-symbols-outlined text-sm group-hover:rotate-90 transition-transform">close</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-8 md:p-10 flex flex-col gap-6">
          <p className="text-sm font-medium text-muted-foreground border-l-2 border-red-600 pl-4 mb-4">
            Authorized access granted. Exploring {projects.length} verified architectural records for {clubName}.
          </p>
          
          {projects.map((proj, i) => (
            <div key={i} className="group relative rounded-[24px] overflow-hidden border border-border bg-background hover:border-white transition-all shadow-xl flex flex-col sm:flex-row hover:-translate-y-1">
               {/* Image Side */}
               <div className="w-full sm:w-[200px] h-48 sm:h-auto shrink-0 relative overflow-hidden bg-[#050505]">
                 <div className="absolute inset-0 bg-cover bg-center mix-blend-luminosity grayscale group-hover:mix-blend-normal group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" style={{ backgroundImage: `url(${proj.image})` }} />
                 <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0a0a0a] opacity-0 sm:opacity-100" />
               </div>
               
               {/* Details Side */}
               <div className="flex-1 p-6 sm:pl-2 flex flex-col justify-center relative z-10">
                 <div className="flex justify-between items-start mb-2">
                   <h3 className="text-xl font-semibold text-foreground uppercase tracking-tighter leading-none">{proj.title}</h3>
                   <span className="text-[9px] font-semibold text-muted-foreground uppercase tracking-widest bg-card border border-border px-2 py-1 rounded">{proj.date}</span>
                 </div>
                 
                 <div className="flex flex-wrap gap-2 mt-4">
                   {proj.tags.map((t: string, idx: number) => (
                     <span key={idx} className="text-[9px] font-bold uppercase tracking-widest text-slate-300 border border-border rounded bg-[#1a1a1a] px-2 py-1">
                       {t}
                     </span>
                   ))}
                 </div>

                 <button className="mt-6 text-[10px] font-semibold tracking-widest uppercase text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors w-fit">
                   Initialize Instance
                   <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                 </button>
               </div>
            </div>
          ))}
          
          <div className="mt-8 pt-8 border-t border-border flex items-center justify-center text-center">
             <p className="text-[10px] font-semibold text-slate-600 uppercase tracking-widest">
               End of Directory. Further records require Level 4 Authorization.
             </p>
          </div>
        </div>

      </div>
    </div>
  );
};
