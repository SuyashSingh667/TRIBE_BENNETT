import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { mockData } from '../../data/mockData';
import AddClubModal from '../shared/AddClubModal';
import EventModal from '../shared/EventModal';
import { GlobalSearch } from '../shared/GlobalSearch';
import { SharedHeaderUserArea } from '../shared/SharedHeaderUserArea';

export interface SidebarLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;

  accentBorderClass: string;
  accentShadowClass: string;
  accentBgClass: string;
  category: 'Technical' | 'Cultural' | 'Sports';
  onAddClub: (club: any) => void;
}

export const SidebarLayout: React.FC<SidebarLayoutProps> = ({
  children,
  activeTab,
  setActiveTab,

  accentBgClass,
  category,
  onAddClub
}) => {
  const { globalEvents } = mockData;
  const [showAddModal, setShowAddModal] = useState(false);
  
  // Event Management State
  const [events, setEvents] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [editingEvent, setEditingEvent] = useState<any>(null);
  const [showEventModal, setShowEventModal] = useState(false);

  React.useEffect(() => {
    const savedEvents = localStorage.getItem('tribe_events');
    if (savedEvents) {
      try {
        setEvents(JSON.parse(savedEvents));
      } catch (e) {
        setEvents(globalEvents || []);
      }
    } else {
      setEvents(globalEvents || []);
    }
  }, [globalEvents]);

  const saveEvents = (newEvents: any[]) => {
    setEvents(newEvents);
    localStorage.setItem('tribe_events', JSON.stringify(newEvents));
  };

  const handleSaveEvent = (eventData: any) => {
    const exists = events.find(e => e.id === eventData.id);
    let updated;
    if (exists) {
      updated = events.map(e => e.id === eventData.id ? eventData : e);
    } else {
      updated = [...events, eventData];
    }
    saveEvents(updated);
    setShowEventModal(false);
  };

  return (
    <div className={`flex min-h-screen w-full bg-[#fdfaf6] font-display text-black`}>
      {/* Sidebar Navigation */}
      <aside className={`w-64 bg-white border-r-[4px] border-black hidden md:flex flex-col relative z-20`}>
        <div className="p-6 flex flex-col gap-8">
          <Link to="/" className="flex items-center gap-3 group">
            <div className={`w-10 h-10 ${accentBgClass} rounded-xl flex items-center justify-center shadow-neo group-hover:-translate-y-1 transition-all border-[3px] border-black`}>
              <span className="material-symbols-outlined text-black font-black text-xl">hub</span>
            </div>
            <h1 className="text-2xl font-black tracking-tight uppercase text-black mt-1">TRIBE</h1>
          </Link>
          
          <nav className="flex-1 space-y-2">
            <Link to="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl text-black hover:bg-gray-100 transition-all font-bold group border-[3px] border-transparent hover:border-black hover:shadow-neo-sm">
              <span className="material-symbols-outlined text-xl group-hover:scale-110 transition-transform font-black">dashboard</span>
              <span className="tracking-widest uppercase text-xs">Dashboard</span>
            </Link>
            
            {[
              { id: 'clubs', icon: 'groups', label: 'Clubs' },
              { id: 'events', icon: 'event', label: 'Events' },
            ].map(item => (
              <div 
                key={item.id}
                onClick={() => setActiveTab(item.id)} 
                className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all font-bold group
                  ${activeTab === item.id 
                    ? `bg-white border-[3px] border-black shadow-neo-sm` 
                    : 'text-black hover:bg-gray-100 border-[3px] border-transparent hover:border-black hover:shadow-neo-sm'
                  }`}
              >
                <span className={`material-symbols-outlined text-xl font-black`}>{item.icon}</span>
                <span className="tracking-widest uppercase text-xs">{item.label}</span>
                {activeTab === item.id && (
                  <div className={`ml-auto w-2 h-2 rounded-full ${accentBgClass} border-2 border-black`}></div>
                )}
              </div>
            ))}

            <div className="pt-8 pb-2 px-4 uppercase text-[10px] font-black text-black tracking-[0.2em] border-b-[3px] border-black mb-4">System</div>
            
            {[

            ].map(item => (
              <div 
                key={item.id}
                onClick={() => setActiveTab(item.id)} 
                className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all font-bold group
                  ${activeTab === item.id 
                    ? `bg-white border-[3px] border-black shadow-neo-sm` 
                    : 'text-black hover:bg-gray-100 border-[3px] border-transparent hover:border-black hover:shadow-neo-sm'
                  }`}
              >
                <span className={`material-symbols-outlined text-xl font-black`}>{item.icon}</span>
                <span className="tracking-widest uppercase text-xs">{item.label}</span>
              </div>
            ))}
          </nav>
        </div>
        
        <div className="p-6 mt-auto">
          <div className="bg-white border-[3px] border-black rounded-2xl p-5 shadow-neo-sm text-center flex flex-col items-center">
            <span className="material-symbols-outlined text-black font-black mb-2">memory</span>
            <p className="text-[10px] text-black mb-1 font-black tracking-widest uppercase">{category} System</p>
            <p className="font-black text-black tracking-wider">v3.0</p>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto relative bg-[#fdfaf6]">
        {/* Top Navbar */}
        <header className={`sticky top-0 z-50 bg-[#fdfaf6] px-8 py-5 flex items-center justify-between border-b-[4px] border-black`}>
          <div className="flex items-center gap-4 flex-1 max-w-xl">
            <GlobalSearch />
          </div>
          <SharedHeaderUserArea />
        </header>

        {/* Dynamic Content */}
        <div className="relative z-10 w-full h-full">
          {activeTab === 'clubs' && children}
          


          {activeTab === 'events' && (
            <div className="p-8 md:p-12 max-w-[1400px] mx-auto animate-in fade-in duration-500 font-display">
               <div className="flex justify-between items-end mb-12">
                  <div>
                    <h2 className="text-5xl md:text-[64px] font-black tracking-tighter text-black uppercase mb-4">Event Calendar</h2>
                    <p className="text-black font-bold max-w-xl">Track all upcoming operational events, focus groups, and division-wide sprints.</p>
                  </div>
                  <button onClick={() => { setEditingEvent(null); setShowEventModal(true); }} className="px-6 py-4 rounded-xl bg-white border-[3px] border-black hover:bg-gray-100 text-black font-black text-xs tracking-widest uppercase transition-all shadow-neo-sm hover:-translate-y-1 hover:shadow-neo-hover">Add Event</button>
               </div>

               <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                 {/* Calendar View */}
                 <div className="xl:col-span-2 bg-white border-[4px] border-black rounded-[32px] p-8 shadow-neo relative overflow-hidden">
                    <div className="flex items-center justify-between mb-8 pb-6 border-b-[4px] border-black">
                      <div className="flex items-center gap-4">
                        <h3 className="text-3xl font-black text-black uppercase tracking-tighter">May 2026</h3>
                      </div>
                      <div className="flex gap-2">
                        <button className="size-10 rounded-xl bg-white border-[3px] border-black flex items-center justify-center hover:bg-gray-100 transition-colors shadow-neo-sm">
                          <span className="material-symbols-outlined font-black">chevron_left</span>
                        </button>
                        <button className="size-10 rounded-xl bg-white border-[3px] border-black flex items-center justify-center hover:bg-gray-100 transition-colors shadow-neo-sm">
                          <span className="material-symbols-outlined font-black">chevron_right</span>
                        </button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-7 gap-4 mb-4">
                      {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
                        <div key={day} className="text-center text-[10px] font-black text-black tracking-widest uppercase py-2 bg-gray-100 border-[3px] border-black rounded-lg">{day}</div>
                      ))}
                    </div>
                    
                    <div className="grid grid-cols-7 gap-4">
                      {Array.from({ length: 31 }).map((_, i) => {
                        const day = i + 1;
                        const hasEvent = events.some(e => e.day === day);
                        const isSelected = selectedDate === day;
                        return (
                          <div 
                            key={i} 
                            onClick={() => setSelectedDate(day)}
                            className={`aspect-square rounded-xl border-[3px] border-black p-2 relative cursor-pointer transition-all hover:bg-gray-100 ${isSelected ? 'bg-black text-white' : 'bg-[#fdfaf6] text-black'} shadow-neo-sm`}
                          >
                            <span className="text-sm font-black">{day}</span>
                            {hasEvent && (
                              <div className={`absolute bottom-2 right-2 size-3 rounded-sm ${isSelected ? 'bg-white' : 'bg-[#ffde00]'} border-2 border-black`}></div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                 </div>

                 {/* Day Schedule */}
                 <div className="flex flex-col gap-6">
                    <div className="bg-white border-[4px] border-black rounded-[32px] p-8 shadow-neo">
                       <h3 className="text-2xl font-black text-black uppercase tracking-tighter mb-2">Schedule</h3>
                       <p className="text-sm font-bold text-gray-700 mb-6">Events for {selectedDate ? `May ${selectedDate}, 2026` : 'all days'}</p>
                       
                       <div className="flex flex-col gap-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                         {events.filter(e => selectedDate ? e.day === selectedDate : true).length === 0 ? (
                           <div className="text-center p-8 border-[3px] border-dashed border-black rounded-xl">
                             <p className="text-sm font-bold text-black">No events scheduled.</p>
                           </div>
                         ) : (
                           events.filter(e => selectedDate ? e.day === selectedDate : true).map((ev, i) => (
                             <div onClick={() => { setEditingEvent(ev); setShowEventModal(true); }} key={ev.id || i} className="group flex flex-col gap-4 p-6 rounded-2xl bg-[#fdfaf6] hover:bg-white transition-all border-[3px] border-black cursor-pointer shadow-neo-sm hover:-translate-y-1 hover:shadow-neo-hover">
                               <div className="flex justify-between items-start gap-4">
                                 <div>
                                   <div className="flex items-center gap-2 mb-2">
                                     <span className="text-[10px] font-black uppercase tracking-widest bg-white border-[3px] border-black px-2 py-1 rounded-md">{ev.time}</span>
                                     <span className="text-[10px] font-black uppercase tracking-widest bg-[#a1ff00] text-black border-[3px] border-black px-2 py-1 rounded-md">{ev.type}</span>
                                   </div>
                                   <h4 className="text-xl font-black text-black uppercase leading-tight mb-2 group-hover:underline decoration-4 underline-offset-4">{ev.title}</h4>
                                   <p className="text-xs font-bold text-gray-700">By {ev.org}</p>
                                 </div>
                               </div>
                               <div className="text-xs font-bold text-gray-700 mt-2 border-l-[3px] border-black pl-3">{ev.description}</div>
                             </div>
                           ))
                         )}
                       </div>
                    </div>
                 </div>
               </div>
            </div>
          )}
        </div>
      </main>

      {showAddModal && <AddClubModal onClose={() => setShowAddModal(false)} onAdd={onAddClub} category={category} />}
      {showEventModal && <EventModal initialData={editingEvent} onClose={() => setShowEventModal(false)} onSave={handleSaveEvent} />}
    </div>
  );
};

export default SidebarLayout;
