import React, { useState } from 'react';
import { EventRegistrationForm } from './EventRegistrationForm';

interface EventDetailDrawerProps {
  event: any;
  onClose: () => void;
}

export const EventDetailDrawer: React.FC<EventDetailDrawerProps> = ({ event, onClose }) => {
  const [showRegistration, setShowRegistration] = useState(false);

  if (!event) return null;

  return (
    <div className="fixed inset-0 z-[500] flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-inverse-surface/60 backdrop-blur-md animate-in fade-in duration-200" 
        onClick={onClose}
      />
      
      {/* Sliding Panel */}
      <div className="relative w-full max-w-[550px] h-full bg-surface-container-lowest border-l border-tertiary/30 shadow-[0_0_60px_rgba(0,0,0,0.2)] flex flex-col animate-in slide-in-from-right duration-200 overflow-hidden">
        
        {/* Subtle Heritage Header Motif */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-tertiary/20 to-transparent pointer-events-none opacity-50"></div>
        <div className="absolute top-0 right-0 indian-motif-pattern w-full h-48 opacity-[0.05] pointer-events-none mix-blend-overlay border-b border-tertiary/10"></div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col relative z-10">
          
          <div className="p-8 md:p-12 border-b border-outline-variant bg-surface/50 backdrop-blur-sm">
            <div className="flex justify-between items-start mb-8">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-4 py-1.5 rounded-full bg-primary text-on-primary text-[10px] font-semibold tracking-widest uppercase shadow-sm">{event.type || 'Event'}</span>
                <span className="text-tertiary text-[10px] font-semibold tracking-widest uppercase bg-surface-variant px-4 py-1.5 rounded-full border border-tertiary/10">{event.org || 'Global'}</span>
              </div>
              <button onClick={onClose} className="size-12 rounded-full bg-surface hover:bg-primary text-on-surface-variant hover:text-on-primary border border-outline-variant flex items-center justify-center transition-all group shadow-sm">
                <span className="material-symbols-outlined text-sm group-hover:rotate-90 transition-transform duration-300">close</span>
              </button>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-headline-lg text-on-surface leading-tight tracking-tight mb-4">{event.title}</h2>
            <p className="text-body-lg text-on-surface-variant leading-relaxed font-light">{event.description || "Detailed overview logging standard operational context for the specified protocol event."}</p>
          </div>

          <div className="p-8 md:p-12 flex flex-col gap-10 flex-1">
             
             {/* Key Metrics Grid */}
             <div className="grid grid-cols-2 gap-y-8 gap-x-6">
                <div>
                  <span className="text-[10px] font-label-caps uppercase tracking-widest text-on-surface-variant mb-2 block">Scheduled Date</span>
                  <span className="text-2xl font-headline-md text-primary">{event.date} 2026</span>
                </div>
                <div>
                  <span className="text-[10px] font-label-caps uppercase tracking-widest text-on-surface-variant mb-2 block">Timeframe</span>
                  <span className="text-2xl font-headline-md text-on-surface">{event.time || "TBD"}</span>
                </div>
                <div>
                  <span className="text-[10px] font-label-caps uppercase tracking-widest text-on-surface-variant mb-2 block">Location / Vector</span>
                  <span className="text-xl font-headline-sm text-on-surface">{event.location || "TBA"}</span>
                </div>
                <div>
                  <span className="text-[10px] font-label-caps uppercase tracking-widest text-on-surface-variant mb-2 block">Status</span>
                  <span className="text-xl font-headline-sm text-tertiary">Registration Open</span>
                </div>
             </div>

             <div className="mt-4 p-8 bg-surface border border-tertiary/20 rounded-[32px] shadow-sm relative overflow-hidden group">
               <div className="absolute top-0 left-0 w-1 h-full bg-tertiary"></div>
               <h4 className="flex items-center gap-2 text-[10px] font-label-caps uppercase tracking-widest text-tertiary mb-3">
                 <span className="material-symbols-outlined text-[16px]">info</span>
                 Organizer Note
               </h4>
               <p className="text-body-md text-on-surface-variant font-medium leading-relaxed">
                 Ensure early transmission of registration payload. Resources and access tokens are limited.
               </p>
             </div>
          </div>

          {/* Fixed Footer CTA */}
          <div className="p-8 border-t border-outline-variant bg-surface/80 backdrop-blur-md">
            <button 
              onClick={() => setShowRegistration(true)} 
              className="w-full py-5 rounded-full bg-primary hover:bg-primary/90 text-on-primary font-semibold uppercase text-xs tracking-widest transition-all shadow-md hover:shadow-lg hover:-translate-y-1 flex items-center justify-center gap-3"
            >
              Register for Event <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>

      {showRegistration && (
        <EventRegistrationForm eventTitle={event.title} event={event} onClose={() => { setShowRegistration(false); onClose(); }} />
      )}
    </div>
  );
};
