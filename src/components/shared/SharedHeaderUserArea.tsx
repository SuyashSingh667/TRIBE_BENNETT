import React, { useState, useEffect, useRef } from 'react';
import { EventDetailDrawer } from './EventDetailDrawer';

export const SharedHeaderUserArea: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [registeredEvents, setRegisteredEvents] = useState<any[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {

    const loadRegistrations = () => {
      const regsStr = localStorage.getItem('tribe_event_registrations');
      if (regsStr) {
         try {
           const parsed = JSON.parse(regsStr);
           setRegisteredEvents(parsed);
         } catch (e) {}
      }
    };

    loadRegistrations();
    window.addEventListener('registration_added', loadRegistrations);

    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
       document.removeEventListener('mousedown', handleClickOutside);
       window.removeEventListener('registration_added', loadRegistrations);
    };
  }, []);

  const today = new Date();
  const monthNames = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
  const todayStr1 = `${monthNames[today.getMonth()]} ${today.getDate() < 10 ? '0'+today.getDate() : today.getDate()}`.toLowerCase();
  const todayStr2 = `${monthNames[today.getMonth()]} ${today.getDate()}`.toLowerCase();

  const trulyTodayEvents = registeredEvents.filter((reg: any) => {
    if(!reg.event || !reg.event.date) return false;
    const d = reg.event.date.toLowerCase();
    return d.includes(todayStr1) || d.includes(todayStr2) || d.includes('today');
  });

  const displayEvents = trulyTodayEvents;

  const handleOpenEvent = (evt: any) => {
    setSelectedEvent(evt);
    setShowNotifications(false);
  };

  return (
    <div className="flex items-center gap-5">
      
      {/* Today's Notification Bell */}
      <div className="relative z-50">
        <button 
          onClick={() => setShowNotifications(!showNotifications)}
          className="size-12 flex items-center justify-center rounded-xl bg-white hover:bg-gray-100 text-black transition-colors border-[3px] border-black shadow-neo-sm relative active:scale-95 hover:-translate-y-1 hover:shadow-neo-hover"
        >
          <span className="material-symbols-outlined text-black font-black">notifications</span>
          {displayEvents.length > 0 && (
             <span className="absolute -top-2 -right-2 size-5 rounded-md bg-[#ffde00] text-black text-[10px] font-black flex items-center justify-center border-[3px] border-black">
               {displayEvents.length}
             </span>
          )}
        </button>

        {showNotifications && (
           <div ref={dropdownRef} className="absolute top-16 right-0 w-[380px] bg-white border-[4px] border-black rounded-2xl shadow-neo overflow-hidden flex flex-col font-display animate-in slide-in-from-top-2 fade-in duration-200">
             <div className="p-4 border-b-[4px] border-black bg-[#fdfaf6]">
               <h3 className="text-[10px] font-black tracking-[0.2em] uppercase text-black flex items-center gap-2">
                 <span className="w-2 h-2 border-2 border-black bg-red-500 animate-pulse"></span>
                 Today's Registrations
               </h3>
             </div>
             
             <div className="max-h-[60vh] overflow-y-auto custom-scrollbar">
                {displayEvents.length === 0 ? (
                  <div className="p-8 text-center flex flex-col items-center">
                    <span className="material-symbols-outlined text-gray-400 text-3xl mb-3 font-black">event_busy</span>
                    <p className="text-black text-sm font-black tracking-widest uppercase mb-1">Clear Horizon</p>
                    <p className="text-gray-600 text-xs font-bold">No registered events scheduled for today.</p>
                  </div>
                ) : (
                  <div className="p-4 flex flex-col gap-3">
                    {displayEvents.map((reg, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-white hover:bg-[#ffde00] transition-colors border-[3px] border-black group cursor-pointer shadow-neo-sm" onClick={() => handleOpenEvent(reg.event)}>
                        <div className="flex justify-between items-start mb-2">
                           <span className="text-[9px] font-black uppercase tracking-widest text-black bg-white border-[2px] border-black px-2 py-0.5 rounded">{reg.event.time || 'All Day'}</span>
                           <span className="text-[9px] font-black uppercase tracking-widest text-black bg-white border-[2px] border-black px-2 py-0.5 rounded">{reg.event.org || 'Tribe'} • {reg.event.__cat || 'Event'}</span>
                        </div>
                        <h4 className="text-black text-lg font-black uppercase tracking-tighter mb-2 leading-tight mt-3">{reg.event.title}</h4>
                        <div className="flex items-center gap-1 text-gray-700 text-[10px] font-black uppercase tracking-widest mt-2 border-l-[3px] border-black pl-2 group-hover:text-black">
                           <span className="material-symbols-outlined text-[14px]">location_on</span>
                           {reg.event.location || 'Remote Vector'}
                        </div>
                        <button className="mt-4 w-full py-2 bg-white text-black font-black uppercase tracking-[0.2em] rounded-lg transition-colors border-[3px] border-black group-hover:bg-black group-hover:text-white shadow-neo-sm">
                           View Details
                        </button>
                      </div>
                    ))}
                  </div>
                )}
             </div>
           </div>
        )}
      </div>

      {children}
      
      {selectedEvent && <EventDetailDrawer event={selectedEvent} onClose={() => setSelectedEvent(null)} />}
    </div>
  );
};
