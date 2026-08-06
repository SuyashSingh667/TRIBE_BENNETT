import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockData } from '../../data/mockData';
import { EventDetailDrawer } from './EventDetailDrawer';

interface SearchResult {
  type: 'club' | 'event' | 'person' | 'keyword';
  title: string;
  subtitle: string;
  icon: string;
  data: any;
}

export const GlobalSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const navigate = useNavigate();
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    
    const q = query.toLowerCase();
    const res: SearchResult[] = [];

    // Aggregate clubs
    const allClubs: any[] = [
      ...mockData.technicalClubs.map(c => ({...c, __cat: 'technical'})),
      ...mockData.culturalClubs.map(c => ({...c, __cat: 'cultural'})),
      ...mockData.sportsClubs.map(c => ({...c, __cat: 'sports'}))
    ];

    allClubs.forEach(club => {
      // Match club by name or description
      if (club.name?.toLowerCase().includes(q) || club.description?.toLowerCase().includes(q)) {
        res.push({
          type: 'club',
          title: club.name,
          subtitle: club.description || `${club.__cat} Club`,
          icon: club.icon || 'groups',
          data: club
        });
      }

      // Match club leads (people)
      if (club.lead?.toLowerCase().includes(q)) {
        res.push({
          type: 'person',
          title: club.lead,
          subtitle: `Node Lead @ ${club.name}`,
          icon: 'person',
          data: club
        });
      }
      
      // Additional leads in clubLeads
      if (club.clubLeads && Array.isArray(club.clubLeads)) {
        club.clubLeads.forEach((lead: any) => {
          if (lead.name.toLowerCase().includes(q) || lead.role.toLowerCase().includes(q)) {
             const existing = res.find(r => r.type === 'person' && r.title === lead.name);
             if(!existing) {
               res.push({
                 type: 'person',
                 title: lead.name,
                 subtitle: `${lead.role} @ ${club.name}`,
                 icon: 'admin_panel_settings',
                 data: club
               });
             }
          }
        });
      }

      // Upcoming events for clubs
      if (club.upcomingEvents && Array.isArray(club.upcomingEvents)) {
        club.upcomingEvents.forEach((evt: any) => {
           if (evt.title?.toLowerCase().includes(q)) {
             res.push({
               type: 'event',
               title: evt.title,
               subtitle: `${club.name} • ${evt.date}`,
               icon: 'event',
               data: { ...evt, org: club.name, type: 'Upcoming' }
             });
           }
        });
      }
    });

    // Aggregate Master Calendar events
    mockData.globalEvents.forEach(evt => {
       if (evt.title.toLowerCase().includes(q) || evt.description?.toLowerCase().includes(q) || evt.type?.toLowerCase().includes(q)) {
         res.push({
            type: 'event',
            title: evt.title,
            subtitle: `${evt.org} • ${evt.date}`,
            icon: 'calendar_month',
            data: evt
         });
       }
    });

    // Tag matching / Recommendations
    const smartTags = ['ai', 'ml', 'coding', 'design', 'art', 'dance', 'football', 'robotics'];
    smartTags.forEach(tag => {
      if (tag.includes(q)) {
        res.push({
          type: 'keyword',
          title: `Explore: ${tag.toUpperCase()}`,
          subtitle: 'Smart recommendation based on interest',
          icon: 'auto_awesome',
          data: { tag }
        });
      }
    });

    return res.slice(0, 15); // Limit max results
  }, [query]);

  const handleSelect = (res: SearchResult) => {
    setIsOpen(false);
    setQuery('');
    
    if (res.type === 'club' || res.type === 'person') {
       const club = res.data;
       navigate(`/club/${encodeURIComponent(club.name.toLowerCase().replace(/\s+/g,'-'))}?type=${club.__cat}`);
    } else if (res.type === 'event') {
       // Open Event detail drawer locally inside this overlay
       setSelectedEvent(res.data);
    } else if (res.type === 'keyword') {
       // Search via keyword
       setQuery(res.data.tag);
       setIsOpen(true);
    }
  };

  const grouped = results.reduce((acc, curr) => {
    if(!acc[curr.type]) acc[curr.type] = [];
    acc[curr.type].push(curr);
    return acc;
  }, {} as Record<string, SearchResult[]>);

  const groupLabels: Record<string, string> = {
    club: 'Clubs & Hubs',
    event: 'Operations & Events',
    person: 'Command Leads',
    keyword: 'Recommendations'
  };

  return (
    <div className="relative w-full max-w-xl group z-[100]" ref={wrapperRef}>
      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors font-black">search</span>
      <input 
        value={query}
        onChange={(e) => { setQuery(e.target.value); setIsOpen(true); }}
        onFocus={() => { if(query) setIsOpen(true); }}
        className={`w-full bg-white border-[3px] border-black rounded-xl pl-12 pr-12 py-3 focus:outline-none focus:bg-gray-50 transition-all text-sm text-black placeholder:text-gray-500 font-bold shadow-neo-sm`} 
        placeholder="Type keyword, club name, or event..." 
        type="text" 
      />
      {query && (
        <button 
          onClick={() => { setQuery(''); setIsOpen(false); }} 
          className="absolute right-4 top-1/2 -translate-y-1/2 text-black hover:bg-gray-200 rounded-md p-1 flex items-center justify-center transition-colors"
        >
          <span className="material-symbols-outlined text-sm font-black">close</span>
        </button>
      )}

      {isOpen && query.trim().length > 0 && (
        <div className="absolute top-16 left-0 w-full bg-white border-[4px] border-black rounded-2xl shadow-neo overflow-hidden flex flex-col font-display animate-in slide-in-from-top-2 fade-in duration-200">
          
          <div className="max-h-[60vh] overflow-y-auto custom-scrollbar">
            {results.length === 0 ? (
               <div className="p-8 text-center flex flex-col items-center bg-[#fdfaf6]">
                 <span className="material-symbols-outlined text-gray-400 text-3xl mb-3 font-black">search_off</span>
                 <p className="text-black text-sm font-black tracking-widest uppercase mb-1">No matching assets found</p>
                 <p className="text-gray-600 text-xs font-bold">Try adjusting your operational parameters.</p>
               </div>
            ) : (
               <div className="p-4 flex flex-col gap-6">
                 {Object.entries(grouped).map(([type, items]) => (
                   <div key={type}>
                     <h3 className="text-[9px] font-black tracking-[0.2em] uppercase text-black mb-3 px-3 flex items-center gap-2">
                       <span className="w-2 h-2 border-2 border-black bg-[#ffde00]"></span>
                       {groupLabels[type] || type}
                     </h3>
                     <div className="flex flex-col gap-2">
                       {items.map((item, idx) => (
                         <div 
                           key={idx}
                           onClick={() => handleSelect(item)}
                           className="flex items-center gap-4 p-3 rounded-xl bg-white hover:bg-[#ffde00] cursor-pointer group/item transition-colors border-[3px] border-black shadow-neo-sm hover:-translate-y-1 hover:shadow-neo-hover"
                         >
                           <div className="size-10 rounded-lg bg-white border-[3px] border-black flex items-center justify-center text-black font-black transition-all">
                             <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
                           </div>
                           <div className="flex flex-col flex-1 truncate">
                             <span className="text-black text-sm font-black truncate">{item.title}</span>
                             <span className="text-gray-700 text-xs font-bold truncate">{item.subtitle}</span>
                           </div>
                           <span className="material-symbols-outlined text-black font-black opacity-0 group-hover/item:opacity-100 group-hover/item:-translate-x-1 transition-all text-sm">arrow_forward</span>
                         </div>
                       ))}
                     </div>
                   </div>
                 ))}
               </div>
            )}
          </div>
          
          <div className="p-3 bg-[#fdfaf6] border-t-[4px] border-black flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-black">
             <span>Press Esc to close</span>
             <span>TRIBE Global Query System</span>
          </div>

        </div>
      )}

      {selectedEvent && (
        <EventDetailDrawer event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}
    </div>
  );
};
