import React, { useState, useMemo } from 'react';
import { EventDetailDrawer } from './EventDetailDrawer';
import { mockData } from '../../data/mockData';
import { getCollisionFreeMasterEvents } from '../../lib/clubManager';
import type { TribeEvent as SharedTribeEvent } from '../../lib/clubManager';

export type TribeEvent = SharedTribeEvent;

const getMasterEvents = (): TribeEvent[] => {
  return getCollisionFreeMasterEvents();
};

interface MasterCalendarModalProps {
  onClose: () => void;
}

export const MasterCalendarModal: React.FC<MasterCalendarModalProps> = ({ onClose }) => {
  const [calendarFilter, setCalendarFilter] = useState('All');
  const [viewingEvent, setViewingEvent] = useState<TribeEvent | null>(null);

  const masterEvents = useMemo(() => getMasterEvents(), []);

  const [events] = useState<TribeEvent[]>(() => {
    const saved = localStorage.getItem('tribe_events');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return [...masterEvents, ...parsed].filter((v,i,a)=>a.findIndex(t=>(t.id === v.id))===i);
      } catch {
        return masterEvents;
      }
    }
    return masterEvents;
  });

  const filteredMasterEvents = events.filter(e => calendarFilter === 'All' ? true : e.type?.toLowerCase() === calendarFilter.toLowerCase());

  return (
    <>
      <div className="fixed inset-0 z-[200] bg-inverse-surface/80 backdrop-blur-xl flex flex-col p-4 md:p-12 lg:p-16 overflow-y-auto animate-in fade-in zoom-in-95 duration-150">
        <div className="max-w-[1400px] w-full mx-auto relative flex flex-col h-full bg-background border-[2px] border-tertiary/50 rounded-t-[60px] rounded-b-[24px] shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden">
          
          <header className="px-10 py-10 border-b border-tertiary/30 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-primary relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-tertiary via-transparent to-transparent pointer-events-none"></div>
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-headline-lg tracking-tight text-on-primary mb-2">Unified Calendar</h2>
              <div className="flex items-center gap-3">
                <div className="w-8 h-px bg-tertiary"></div>
                <p className="text-xs font-label-caps text-tertiary-fixed tracking-[0.2em] uppercase">All Nodes & Divisions</p>
              </div>
            </div>
            <button onClick={onClose} className="absolute top-10 right-10 size-12 rounded-full bg-white/10 hover:bg-surface-tint border border-tertiary/50 text-white flex items-center justify-center transition-all group z-50">
              <span className="material-symbols-outlined text-lg group-hover:rotate-90 transition-transform">close</span>
            </button>
          </header>

          <div className="px-10 py-6 border-b border-tertiary/20 bg-surface-container flex overflow-x-auto custom-scrollbar gap-4">
            {['All', 'Technical', 'Cultural', 'Sports', 'Summit', 'Workshop'].map(cat => (
              <button 
                key={cat} onClick={() => setCalendarFilter(cat)}
                className={`px-6 py-2.5 rounded-full text-label-caps font-semibold tracking-widest uppercase whitespace-nowrap transition-all border ${calendarFilter === cat ? 'bg-primary text-on-primary border-primary shadow-md' : 'bg-transparent text-on-surface border-tertiary hover:bg-tertiary/10'}`}
              >
                {cat} Calendar
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto p-4 md:p-10 bg-background custom-scrollbar grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
             {filteredMasterEvents.length === 0 ? (
               <div className="col-span-full py-32 flex flex-col items-center text-center">
                  <span className="material-symbols-outlined text-[80px] text-tertiary/50 mb-6">event_busy</span>
                  <h3 className="text-headline-md text-on-surface">No telemetry recorded</h3>
                  <p className="text-body-md text-on-surface-variant mt-2">Try adjusting the databank filters.</p>
               </div>
             ) : (
               filteredMasterEvents.map((ev, idx) => (
                  <div key={ev.id || idx} onClick={() => setViewingEvent(ev)} className="group relative flex flex-col rounded-[32px] border border-tertiary/20 bg-surface shadow-md hover:shadow-2xl hover:-translate-y-1 overflow-hidden cursor-pointer transition-all duration-300 min-h-[340px]">
                    
                    {/* TOP BANNER: Rich color + Performant Backgrounds */}
                    <div className="relative h-[130px] shrink-0 bg-primary p-6 overflow-hidden flex justify-between items-start border-b border-tertiary/20">
                      {/* Base Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-black/10 to-black/30 pointer-events-none"></div>
                      
                      {/* Indian Motif Background - NO mix-blend-overlay for performance */}
                      <div className="absolute inset-0 indian-motif-pattern opacity-10 pointer-events-none"></div>
                      
                      {/* Performant Glow using Radial Gradient instead of blur-3xl */}
                      <div className="absolute -top-10 -right-10 w-48 h-48 bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-500 pointer-events-none"></div>

                      <div className="relative z-10 flex flex-col items-start">
                         <span className="text-5xl font-headline-xl text-on-primary tracking-tighter leading-none">{String(ev.day || 1).padStart(2, '0')}</span>
                         <span className="text-[10px] font-label-caps text-on-primary/80 tracking-[0.3em] uppercase mt-2">
                           {new Date().toLocaleString('en-US', { month: 'short' }).toUpperCase()} {new Date().getFullYear()}
                         </span>
                      </div>

                      <span className="relative z-10 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-[9px] font-semibold tracking-widest uppercase shadow-sm">
                        {ev.type || 'System'}
                      </span>
                    </div>

                    {/* BOTTOM CONTENT */}
                    <div className="relative p-6 flex flex-col grow bg-surface min-h-[210px]">
                      <div className="flex items-center gap-3 mb-4 shrink-0">
                        <div className="w-8 h-[1px] bg-tertiary/40"></div>
                        <span className="text-tertiary text-[10px] font-semibold tracking-widest uppercase">{ev.org || 'Global'}</span>
                      </div>
                      
                      <h4 className="text-2xl font-headline-md text-on-surface leading-tight mb-3 group-hover:text-primary transition-colors line-clamp-2 shrink-0">{ev.title || 'Untitled Architecture'}</h4>
                      <p className="text-body-sm text-on-surface-variant line-clamp-2 grow">{ev.description || "Details rendering. Check back momentarily."}</p>

                      <div className="mt-auto pt-4 border-t border-tertiary/15 flex justify-between items-center overflow-hidden shrink-0">
                        <span className="text-[10px] font-label-caps text-tertiary uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-4 group-hover:translate-x-0">Explore Event</span>
                        
                        <div className="w-12 h-12 rounded-full bg-surface-variant border border-outline-variant flex items-center justify-center group-hover:bg-primary group-hover:text-on-primary group-hover:border-primary transition-all duration-300 shadow-sm relative z-10">
                          <span className="material-symbols-outlined text-lg transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300">arrow_forward</span>
                        </div>
                      </div>
                    </div>
                  </div>
               ))
             )}
          </div>
        </div>
      </div>
      
      {viewingEvent && <EventDetailDrawer event={viewingEvent} onClose={() => setViewingEvent(null)} />}
    </>
  );
};
