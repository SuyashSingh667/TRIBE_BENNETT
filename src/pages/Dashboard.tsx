import React, { useState, useMemo } from 'react';
import { mockData } from '../data/mockData';
import { Link } from 'react-router-dom';
import cardBgImage from '../assets/card-bg.jpg';
import EventModal from '../components/shared/EventModal';
import { EventDetailDrawer } from '../components/shared/EventDetailDrawer';
import { ClubDiscoveryAssistant } from '../components/shared/ClubDiscoveryAssistant';
import { SharedHeaderUserArea } from '../components/shared/SharedHeaderUserArea';
import { ProfilePanel } from '../components/shared/ProfilePanel';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';

const FloatingGalacticSpace = ({ count = 3000 }) => {
  const ref = React.useRef<any>(null);
  const [positions] = useState<any>(() => random.inSphere(new Float32Array(count * 3), { radius: 10 }));
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 15;
      ref.current.rotation.y -= delta / 20;
    }
  });
  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial transparent color="#ffffff" size={0.015} sizeAttenuation={true} depthWrite={false} opacity={0.4} />
      </Points>
    </group>
  );
};

interface DashboardProps {
  readonly children?: React.ReactNode;
  readonly className?: string;
}

export interface TribeEvent {
  id?: string;
  date: string;
  day: number;
  month?: number;
  year?: number;
  time?: string;
  title: string;
  org?: string;
  type?: string;
  description?: string;
}

export const Dashboard: React.FC<DashboardProps> = ({
  className = '',
  ...props
}) => {
  const { dashboard, globalEvents } = mockData;

  // Synthesize master events array from all possible club events + global events
  const masterEvents = useMemo(() => {
    let combined: TribeEvent[] = [...(globalEvents || [])];
    
    // Inject cultural events dynamically to ensure the calendar is heavily populated
    if (mockData.culturalClubs) {
      mockData.culturalClubs.forEach((club: any) => {
        if (club.upcomingEvents) {
          club.upcomingEvents.forEach((ev: any) => {
            const match = ev.date?.match(/(\w+)\s+(\d+)/);
            if (match) {
              combined.push({
                id: `cultural-${club.name}-${match[2]}`,
                title: ev.title,
                org: club.name,
                type: 'Cultural',
                date: `MAY ${match[2]}`,
                day: parseInt(match[2]),
                month: 5,
                year: 2026,
                description: `${club.name} is hosting ${ev.title}. Join the community to participate.`
              });
            }
          });
        }
      });
    }

    // Sort to keep timeline chronologically stable
    return combined.sort((a,b) => a.day - b.day);
  }, [globalEvents]);

  const [events, setEvents] = useState<TribeEvent[]>(() => {
    const saved = localStorage.getItem('tribe_events');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Merge saved local events with the synthesized mock data
        return [...masterEvents, ...parsed].filter((v,i,a)=>a.findIndex(t=>(t.id === v.id))===i);
      } catch {
        return masterEvents;
      }
    }
    return masterEvents;
  });

  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [editingEvent, setEditingEvent] = useState<TribeEvent | null>(null);
  const [viewingEvent, setViewingEvent] = useState<TribeEvent | null>(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showDiscoveryAssistant, setShowDiscoveryAssistant] = useState(false);
  
  // Master Calendar Overlay State
  const [showMasterCalendar, setShowMasterCalendar] = useState(false);
  const [calendarFilter, setCalendarFilter] = useState('All');

  const saveEvents = (newEvents: TribeEvent[]) => {
    setEvents(newEvents);
    // Only persist custom created ones ideally to save quota, but for mock purposes we'll stringify
    localStorage.setItem('tribe_events', JSON.stringify(newEvents));
  };

  const handleSaveEvent = (eventData: TribeEvent) => {
    const exists = events.find((e) => e.id === eventData.id);
    let updated;
    if (exists) {
      updated = events.map((e) => e.id === eventData.id ? eventData : e);
    } else {
      updated = [...events, eventData];
    }
    saveEvents(updated);
    setShowEventModal(false);
  };

  const filteredMasterEvents = events.filter(e => calendarFilter === 'All' ? true : e.type?.toLowerCase() === calendarFilter.toLowerCase());

  return (
    <div className={`relative flex min-h-screen w-full flex-col overflow-x-hidden font-display bg-[#fdfaf6] text-black ${className}`} {...props}>
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white border-b-[4px] border-black px-6 md:px-12 py-5">
        <div className="max-w-screen-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="size-10 bg-[#ffde00] border-[3px] border-black rounded-xl flex items-center justify-center shadow-neo-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-neo-hover transition-all">
              <span className="text-black font-black text-xl">T</span>
            </div>
            <button 
              onClick={() => setShowDiscoveryAssistant(true)}
              className="hidden sm:flex items-center px-6 py-2.5 text-[10px] font-black tracking-[0.2em] uppercase bg-white border-[3px] border-black text-black rounded-full hover:bg-gray-100 shadow-neo-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-neo-hover transition-all active:scale-95 cursor-pointer">
              <span className="material-symbols-outlined text-[14px] mr-2 font-black">smart_toy</span>
              UNSURE WHAT TO JOIN?
            </button>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setShowMasterCalendar(true)}
              className="px-6 py-2.5 rounded-full bg-pink-400 border-[3px] border-black text-black flex items-center gap-3 transition-all tracking-widest text-[10px] font-black uppercase shadow-neo-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-neo-hover active:scale-95"
            >
              <span className="material-symbols-outlined text-sm font-black">calendar_month</span>
              <span className="hidden sm:inline">Master Calendar</span>
            </button>

            <div className="w-1 h-6 bg-black mx-2"></div>
            
            <SharedHeaderUserArea setActiveTab={(tab) => { if (tab === 'profile') setShowProfileModal(true) }} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-screen-2xl mx-auto w-full px-6 md:px-12 py-12 flex-1 flex flex-col relative z-20">
          <div className="animate-in fade-in slide-in-from-bottom-10 duration-700">
            {/* Neo-brutalist Hero Section */}
            <section className="relative p-12 lg:p-20 rounded-[20px] bg-white border-[4px] border-black overflow-hidden mb-12 shadow-neo h-[400px] flex flex-col justify-center">
              <div className="relative z-10 flex flex-col items-start max-w-3xl">
                <div className="inline-flex items-center gap-3 px-5 py-2 rounded-xl bg-[#a1ff00] border-[3px] border-black text-black text-[10px] font-black tracking-[0.2em] uppercase mb-8 shadow-neo-sm">
                  <span className="w-2.5 h-2.5 rounded-full bg-white border-2 border-black animate-pulse"></span>
                  Active Control Center
                </div>
                
                <h1 className="text-5xl sm:text-6xl md:text-[80px] font-black mb-6 tracking-tighter uppercase leading-[0.9] text-black">
                  {dashboard.hero.title}
                </h1>
                
                <p className="text-black text-lg md:text-xl leading-relaxed font-bold mb-10 border-l-[4px] border-black pl-6 bg-[#fff8d6] py-2">
                  {dashboard.hero.description}
                </p>
              </div>
            </section>

            {/* Folder-style Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {dashboard.cards.map((card, index) => {
                const colors = ['bg-[#ffde00]', 'bg-[#ff90e8]', 'bg-[#a1ff00]'];
                const bgColor = colors[index % colors.length];
                return (
                <Link
                  key={card.id}
                  to={card.path}
                  className={`group relative overflow-hidden rounded-[20px] ${bgColor} border-[4px] border-black p-8 md:p-10 flex flex-col justify-between min-h-[460px] cursor-pointer shadow-neo hover:-translate-y-2 hover:shadow-neo-hover transition-all duration-300`}
                >
                  {/* Watermark Icon */}
                  <div className="absolute top-1/4 right-[-10%] p-8 opacity-20 group-hover:opacity-30 group-hover:rotate-12 transition-all duration-500 group-hover:scale-110 transform origin-center pointer-events-none text-black">
                    <span className={`material-symbols-outlined text-[240px] font-black`}>{card.bgIcon}</span>
                  </div>

                  {/* Content Hub */}
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="size-14 rounded-xl flex items-center justify-center mb-auto border-[3px] border-black bg-white text-black shadow-neo-sm group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-2xl font-black">{card.icon}</span>
                    </div>
                    
                    <div className="mt-8 transition-transform duration-500 group-hover:translate-y-[-5px]">
                      <h3 className="text-3xl lg:text-4xl font-black mb-4 uppercase tracking-tighter text-black">{card.title}</h3>
                      <p className="text-black font-bold text-sm mb-8 line-clamp-3">{card.description}</p>
                      
                      <div className="flex items-center gap-4 border-t-[3px] border-black pt-6">
                        <span className="text-[10px] font-black tracking-[0.2em] uppercase text-black">
                          Deploy Module
                        </span>
                        <div className="size-8 rounded-full bg-white border-[3px] border-black text-black flex items-center justify-center shadow-neo-sm group-hover:bg-black group-hover:text-white transition-colors">
                          <span className="material-symbols-outlined text-sm font-black">arrow_forward</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
                );
              })}
            </div>

            {/* NEO-BRUTALIST INTERACTIVE DASHBOARD CALENDAR */}
            <section className="mb-12 p-8 md:p-12 bg-white border-[4px] border-black rounded-[20px] shadow-neo relative overflow-hidden group">
              
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 relative z-10">
                <div>
                  <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-black mb-2 uppercase">Global Intel</h2>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-1 bg-black"></div>
                    <p className="text-xs font-black text-black tracking-[0.3em] uppercase">Event Calendar</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <button onClick={() => setShowMasterCalendar(true)} className="px-8 py-3 rounded-xl bg-white border-[3px] border-black text-black font-black text-[10px] tracking-[0.2em] uppercase hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-neo-hover shadow-neo-sm active:scale-95 transition-all">
                    Execute Master View
                  </button>
                </div>
              </div>

              <div className="grid lg:grid-cols-3 gap-16 relative z-10">
                {/* Visual Interactive Month Grid */}
                <div className="lg:col-span-1 border-[3px] border-black p-6 rounded-[20px] bg-white shadow-neo-sm">
                  <div className="flex items-center justify-between mb-8 pb-4 border-b-[3px] border-black cursor-pointer group-hover:border-black max-w-[300px]" onClick={() => setShowMasterCalendar(true)}>
                     <h3 className="text-2xl font-black text-black uppercase tracking-tighter">May 2026</h3>
                     <span className="material-symbols-outlined text-black font-black">open_in_new</span>
                  </div>
                  
                  <div className="grid grid-cols-7 gap-3 max-w-[300px]">
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, index) => (
                      <div key={index} className="text-center text-[10px] font-black text-black py-2 uppercase">{d}</div>
                    ))}
                    {Array.from({ length: 35 }).map((_, i) => {
                      const daysInMonth = 31;
                      const day = i - 4; 
                      const isCurrentMonth = day > 0 && day <= daysInMonth;
                      const dayEvents = isCurrentMonth ? events.filter(e => e.day === day) : [];
                      const hasEvent = dayEvents.length > 0;
                      const isSelected = selectedDate === day;
                      
                      return (
                        <div 
                          key={i} 
                          onClick={() => {
                            if(isCurrentMonth) {
                              if(hasEvent) setSelectedDate(day);
                              else setShowMasterCalendar(true); // Pop open the master calendar for deep browsing
                            }
                          }}
                          className={`aspect-square flex flex-col items-center justify-center rounded-xl text-xs font-bold transition-all
                            ${!isCurrentMonth ? 'text-transparent cursor-default pointer-events-none' : 'text-black hover:bg-black hover:text-white cursor-pointer border-[2px] border-transparent'}
                            ${hasEvent ? 'bg-[#ffde00] border-[2px] border-black shadow-neo-sm font-black' : ''}
                            ${isSelected ? 'bg-black text-white shadow-neo-sm scale-110 z-10' : ''}
                          `}
                        >
                          {isCurrentMonth ? day : ''}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Event Sidebar Details */}
                <div className="lg:col-span-2 flex flex-col h-full pl-0 lg:pl-16">
                  <div className="flex items-center justify-between mb-8">
                     <h3 className="text-[10px] font-black text-black tracking-[0.3em] uppercase">
                        {selectedDate ? `Telemetry Log: MAY ${selectedDate}` : 'Upcoming Architecture'}
                     </h3>
                     {selectedDate && (
                        <button onClick={() => setSelectedDate(null)} className="text-[10px] font-black tracking-wider uppercase text-black hover:bg-gray-100 px-3 py-1 rounded-md transition-colors">
                          Clear Target
                        </button>
                     )}
                  </div>
                  
                  <div className="flex-1 flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar max-h-[360px]">
                    {events.filter(e => selectedDate ? e.day === selectedDate : true).length === 0 ? (
                      <div className="flex-1 border-[3px] border-dashed border-black rounded-[20px] flex flex-col items-center justify-center p-12 bg-white">
                         <span className="material-symbols-outlined text-4xl text-black mb-4 font-black">radar</span>
                         <p className="text-black font-black uppercase tracking-[0.2em] text-[10px]">No events detected.</p>
                      </div>
                    ) : (
                      events
                      .filter(e => selectedDate ? e.day === selectedDate : true)
                      .slice(0, selectedDate ? undefined : 4)
                      .map((ev, i) => (
                        <div key={ev.id || i} onClick={() => setViewingEvent(ev)} className="group flex flex-col sm:flex-row sm:items-center gap-6 p-6 rounded-[20px] bg-white border-[3px] border-black hover:bg-yellow-100 cursor-pointer shadow-neo-sm hover:-translate-y-1 hover:shadow-neo-hover transition-all duration-300">
                          
                          <div className="w-20 shrink-0 flex flex-col justify-center border-l-[4px] border-black pl-4">
                            <span className="text-black font-black text-2xl tracking-tighter leading-none mb-1">{ev.date.split(' ')[1]}</span>
                            <span className="text-black text-[10px] font-black tracking-[0.2em] uppercase">{ev.date.split(' ')[0]}</span>
                          </div>
                          
                          <div className="flex-1 flex flex-col justify-center">
                            <div className="flex flex-wrap items-center gap-3 mb-2">
                              <span className="px-2.5 py-1 rounded-md bg-white border-[2px] border-black text-black text-[9px] font-black tracking-widest uppercase shadow-neo-sm">{ev.type || 'Event'}</span>
                              <span className="text-black text-[10px] font-black tracking-widest uppercase">{ev.org || 'System Core'}</span>
                            </div>
                            <h4 className="text-lg font-black text-black tracking-tighter uppercase leading-tight line-clamp-1">{ev.title}</h4>
                          </div>
                          
                          <div className="shrink-0 size-12 rounded-full border-[3px] border-black bg-white text-black flex items-center justify-center shadow-neo-sm group-hover:bg-black group-hover:text-white transition-all">
                            <span className="material-symbols-outlined text-sm font-black">visibility</span>
                          </div>

                        </div>
                      ))
                    )}

                    {!selectedDate && events.length > 4 && (
                      <button onClick={() => setShowMasterCalendar(true)} className="mt-4 py-5 text-[10px] font-black tracking-[0.2em] uppercase text-black bg-white hover:bg-yellow-100 transition-all text-center w-full border-[3px] border-black rounded-[20px] shadow-neo-sm hover:-translate-y-1 hover:shadow-neo-hover">
                         Load Full Event Calendar ({events.length} Modules)
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </section>
          </div>
      </main>

      {/* MASTER UNIFIED CALENDAR OVERLAY */}
      {showMasterCalendar && (
        <div className="fixed inset-0 z-[200] bg-[#0a0a0a]/95 backdrop-blur-3xl flex flex-col p-4 md:p-12 lg:p-16 overflow-y-auto animate-in fade-in zoom-in-95 duration-300">
          <div className="max-w-[1400px] w-full mx-auto relative flex flex-col h-full bg-[#111] border border-[#333] rounded-[40px] shadow-[0_0_100px_rgba(0,0,0,0.9)] overflow-hidden">
            
            {/* Overlay Header */}
            <header className="px-10 py-8 border-b border-[#222] flex flex-col md:flex-row md:items-center justify-between gap-6 bg-[#0a0a0a]">
              <div>
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-2 uppercase">Unified Calendar</h2>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-1 bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>
                  <p className="text-xs font-bold text-slate-400 tracking-[0.2em] uppercase">All Nodes & Divisions</p>
                </div>
              </div>
              <button onClick={() => setShowMasterCalendar(false)} className="absolute top-8 right-10 size-12 rounded-full bg-[#222] hover:bg-red-600 border border-[#444] hover:border-red-500 text-white flex items-center justify-center transition-all group z-50">
                <span className="material-symbols-outlined text-lg group-hover:rotate-90 transition-transform">close</span>
              </button>
            </header>

            {/* Filter Hub */}
            <div className="px-10 py-6 border-b border-[#222] bg-[#111] flex overflow-x-auto custom-scrollbar gap-4">
              {['All', 'Technical', 'Cultural', 'Sports', 'Summit', 'Workshop'].map(cat => (
                <button 
                  key={cat} onClick={() => setCalendarFilter(cat)}
                  className={`px-6 py-2.5 rounded-full text-[10px] font-black tracking-widest uppercase whitespace-nowrap transition-all border ${calendarFilter === cat ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.3)]' : 'bg-[#0a0a0a] text-slate-400 border-[#333] hover:border-slate-400 hover:text-white'}`}
                >
                  {cat} Calendar
                </button>
              ))}
            </div>

            {/* Event List / Detail Expansion */}
            <div className="flex-1 overflow-y-auto p-10 bg-[#0a0a0a] custom-scrollbar grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
               {filteredMasterEvents.length === 0 ? (
                 <div className="col-span-full py-32 flex flex-col items-center text-center">
                    <span className="material-symbols-outlined text-[80px] text-slate-800 mb-6">event_busy</span>
                    <h3 className="text-2xl font-black uppercase tracking-tighter text-slate-600">No telemetry recorded</h3>
                    <p className="text-sm font-medium text-slate-500 mt-2">Try adjusting the databank filters.</p>
                 </div>
               ) : (
                 filteredMasterEvents.map((ev, idx) => (
                    <div key={ev.id || idx} className="bg-[#111] border border-[#222] hover:border-white/30 rounded-[32px] p-8 flex flex-col group transition-all hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                      <div className="flex justify-between items-start mb-6">
                        <div className="flex flex-col border-l-2 border-red-600 pl-4">
                          <span className="text-white font-black text-3xl tracking-tighter leading-none mb-1">{ev.date.split(' ')[1]}</span>
                          <span className="text-slate-500 text-[10px] font-black tracking-[0.2em] uppercase">{ev.date.split(' ')[0]} 2026</span>
                        </div>
                        <span className="material-symbols-outlined text-slate-600 group-hover:text-white transition-colors text-3xl">event</span>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 mb-4">
                        <span className="px-3 py-1 rounded-md bg-[#222] text-white text-[9px] font-black tracking-widest uppercase border border-[#333]">{ev.type || 'System Event'}</span>
                        <span className="text-slate-400 text-[10px] font-black tracking-widest uppercase bg-[#0a0a0a] px-3 py-1 rounded-md border border-[#222]">{ev.org || 'Global'}</span>
                      </div>
                      <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-4 line-clamp-2">{ev.title}</h3>
                      <p className="text-sm text-slate-400 font-medium leading-relaxed mb-8 flex-1">{ev.description || "Details rendering. Check back momentarily for comprehensive event structure."}</p>
                      
                      <button onClick={() => setViewingEvent(ev)} className="w-full py-4 rounded-xl bg-[#222] hover:bg-white hover:text-black text-[10px] font-black tracking-[0.2em] text-white uppercase transition-all mt-auto flex items-center justify-center gap-3 border border-[#333]">
                        Expand File <span className="material-symbols-outlined text-sm">open_in_new</span>
                      </button>
                    </div>
                 ))
               )}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-auto px-10 py-8 border-t border-[#222] bg-[#0a0a0a] relative z-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-slate-600 font-black uppercase tracking-[0.3em]">© 2026 TRIBE ECOSYSTEM. ALL SYSTEMS OPERATIONAL.</span>
          </div>
          <div className="flex gap-8 text-[10px] font-black text-slate-600 uppercase tracking-widest">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy</span>
            <span className="hover:text-white cursor-pointer transition-colors">Protocol</span>
            <span className="hover:text-white cursor-pointer transition-colors">Support</span>
          </div>
        </div>
      </footer>

      {showEventModal && <EventModal onClose={() => setShowEventModal(false)} onSave={handleSaveEvent} initialData={editingEvent} />}
      {viewingEvent && <EventDetailDrawer event={viewingEvent} onClose={() => setViewingEvent(null)} />}
      {showDiscoveryAssistant && <ClubDiscoveryAssistant onClose={() => setShowDiscoveryAssistant(false)} />}
      
      {showProfileModal && (
        <div className="fixed inset-0 z-[700] bg-[#0a0a0a]/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300 overflow-y-auto custom-scrollbar">
          <div className="absolute top-8 right-8 z-[710]">
            <button onClick={() => setShowProfileModal(false)} className="size-12 rounded-full bg-[#111] hover:bg-white text-slate-400 hover:text-black border border-[#333] flex items-center justify-center transition-all group shadow-[0_0_20px_rgba(0,0,0,0.8)]">
              <span className="material-symbols-outlined text-lg group-hover:rotate-90 transition-transform">close</span>
            </button>
          </div>
          <div className="w-full max-w-[1000px] my-auto bg-[#111] border border-[#222] rounded-[32px] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.8)] relative">
            <ProfilePanel accentColorClass="text-red-500" accentBgClass="bg-red-500" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
